"use strict";

function printDocTree(doc, indent) {
  if (typeof (doc) === "string")
  {
    return indent + "\"" + doc + "\"";
  }

  const handleArray = (doc) => {
    if (doc.length === 2 && doc[0].type === "line" && doc[1].type === "break-parent") {
      return indent + "hardline";
    }

    let result = indent + "[";
    if (doc.length > 0) {
      result += "\r\n";
    }
    for (let x = 0; x < doc.length; x++)
    {
      result += printDocTree(doc[x], indent + "    ");
      if (x < doc.length - 1) {
        result += ",\r\n";
      }
    }
    result += "\r\n" + indent + "]"
    return result;
  }

  if (Array.isArray(doc)) {
    return handleArray(doc);
  }

  switch (doc.type)
  {
    case "concat":
      return handleArray(doc.parts);
    case "line":
      return indent + (doc.hard ? "hardline" : doc.soft ? "softlife" : "line");
    case "break-parent":
      return indent + "breakParent";
    case "indent":
      return indent + "indent(\r\n" + printDocTree(doc.contents, indent + "    ") + ")";
    case "align":
      return indent + "align(\r\n" + printDocTree(doc.contents, indent + "    ") + ")";
    case "group":
      return indent + "group(\r\n" + printDocTree(doc.contents, indent + "    ") + ")";
    default:
      return indent + JSON.stringify(doc, null, 4);
    //throw new Error("Can't handle " + doc);
  }
}

function printCDocTree(doc, indent) {
  if (typeof (doc) === "string")
  {
    return indent + "\"" + doc + "\"";
  }

  const handleArray = (doc) => {
    if (doc.length === 2 && doc[0].type === "line" && doc[1].type === "break-parent") {
      return indent + (doc[0].literal ? "Doc.LiteralLine" : "Doc.HardLine");
    }

    let result = indent + "Doc.Concat(";
    if (doc.length > 0) {
      result += "\r\n";
    }
    for (let x = 0; x < doc.length; x++)
    {
      result += printCDocTree(doc[x], indent + "    ");
      if (x < doc.length - 1) {
        result += ",\r\n";
      }
    }
    result += ")";
    return result;
  }

  if (Array.isArray(doc)) {
    return handleArray(doc);
  }

  switch (doc.type)
  {
    case "concat":
      return handleArray(doc.parts);
    case "line":
      return indent + (doc.literal ? "Doc.LiteralLine" : doc.hard ? "Doc.HardLine" : doc.soft ? "Doc.SoftLine" : "Doc.Line");
    case "break-parent":
      return indent + "breakParent";
    case "indent":
      return indent + "Doc.Indent(\r\n" + printCDocTree(doc.contents, indent + "    ") + ")";
    case "align":
      return indent + "Doc.Align(\r\n" + printCDocTree(doc.contents, indent + "    ") + ")";
    case "group":
      return indent + "Doc.Group(\r\n" + printCDocTree(doc.contents, indent + "    ") + ")";
    case "indent-if-break":
      // TODO this is missing the options that get passed
      return indent + "Doc.IndentIfBreak(\r\n" + printCDocTree(doc.contents, indent + "    ") + ")";
    default:
      return indent + JSON.stringify(doc, null, 4);
    //throw new Error("Can't handle " + doc);
  }
}

module.exports = {
  printDocTree,
  printCDocTree,
};
