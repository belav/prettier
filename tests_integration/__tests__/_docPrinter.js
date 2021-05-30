"use strict";

const prettier = require("prettier-local");
const { propagateBreaks } = require("../../src/document/doc-utils");
const docPrinter = prettier.doc.printer;
const docBuilders = prettier.doc.builders;

const { printDocToString } = docPrinter;
const { concat, ifBreak, hardline, line, group, indentIfBreak, indent } = docBuilders;

describe("if-break", () => {
  test.each([
    ["prints flat content", group(ifBreak("break", "flat")), "flat"],
    ["prints break content", group(concat([hardline, ifBreak("break", "flat")])), "\nbreak"],
    ["prints break content when does not fit", group(concat(["another", line, ifBreak("break", "flat")])), "another\nbreak"],
    ["prints flat with group id", concat([group("1", { id: "1" }), ifBreak("break", "flat", { groupId: "1" })]), "1flat"],
    ["prints break with group id", concat([group(hardline, { id: "hl" }), ifBreak("break", "flat", { groupId: "hl" })]), "\nbreak"],
  ])("%s", (_, doc, expected) => {
    propagateBreaks(doc);
    const result = printDocToString(doc, { printWidth: 10, tabWidth: 2 });

    expect(result).toBeDefined();
    expect(result.formatted).toEqual(expected);
  });
});

describe("indent-if-break", () => {
  test.each([
    ["basic test", concat([group(indent(hardline), { id: "groupId" }), indentIfBreak(concat(["indent"]), { groupId: "groupId"})]), "\n  indent"],
  ])("%s", (_, doc, expected) => {
    propagateBreaks(doc);
    const result = printDocToString(doc, { printWidth: 10, tabWidth: 2 });

    expect(result).toBeDefined();
    expect(result.formatted).toEqual(expected);
  });
});
