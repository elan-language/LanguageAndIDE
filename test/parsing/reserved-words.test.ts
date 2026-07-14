import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { IdentifierNode } from "../../src/ide/frames/parse-nodes/identifier-node";
import { MethodNameNode } from "../../src/ide/frames/parse-nodes/method-name-node";
import { TypeNameDef } from "../../src/ide/frames/parse-nodes/type-name-def";
import { TypeNameUse } from "../../src/ide/frames/parse-nodes/type-name-use";
import { ParseStatus } from "../../src/ide/frames/status-enums";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import { hash } from "../../src/ide/util";
import { transforms } from "../compiler/compiler-test-helpers";
import { testNodeParse } from "../testHelpers";

suite("Reserved Words", () => {
  const f = new FileImpl(
    hash,
    new Paradigm(""),
    "",
    transforms(),
    new StdLib(new StubInputOutput()),
    false,
    true,
  );
  test("Identifier", () => {
    testNodeParse(new IdentifierNode(f), "x", ParseStatus.valid, "", "", "", "");
    testNodeParse(new IdentifierNode(f), "_x", ParseStatus.valid, "", "", "", "");
    testNodeParse(new IdentifierNode(f), "_", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new IdentifierNode(f), "X", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new IdentifierNode(f), "new", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new IdentifierNode(f), "if", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new IdentifierNode(f), "if_", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new IdentifierNode(f), "this", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new IdentifierNode(f), "true", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new IdentifierNode(f), "false", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new IdentifierNode(f), "strictfp", ParseStatus.valid, "", "", "", "");
    testNodeParse(new IdentifierNode(f), "strictFP", ParseStatus.valid, "", "", "", "");
    testNodeParse(new IdentifierNode(f), "strictfp_", ParseStatus.valid, "", "", "", "");
  });
  test("Identifier", () => {
    testNodeParse(new IdentifierNode(f), "x", ParseStatus.valid, "", "", "", "");
    testNodeParse(new IdentifierNode(f), "x.", ParseStatus.valid, "x", ".", "", "");
    testNodeParse(new IdentifierNode(f), "_x", ParseStatus.valid, "", "", "", "");
    testNodeParse(new IdentifierNode(f), "_", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new IdentifierNode(f), "X", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new IdentifierNode(f), "strictfp", ParseStatus.valid, "", "", "", "");
    testNodeParse(new IdentifierNode(f), "strictfp.", ParseStatus.valid, "", "", "", "");
  });
  test("MethodNameUse", () => {
    testNodeParse(new MethodNameNode(f), "x", ParseStatus.valid, "", "", "", "");
    testNodeParse(new MethodNameNode(f), "_x", ParseStatus.valid, "", "", "", "");
    testNodeParse(new MethodNameNode(f), "_", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new MethodNameNode(f), "X", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new MethodNameNode(f), "new", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new MethodNameNode(f), "if_", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new MethodNameNode(f), "true", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new MethodNameNode(f), "mybase", ParseStatus.valid, "", "", "", "");
    testNodeParse(new MethodNameNode(f), "myBase", ParseStatus.valid, "", "", "", "");
    testNodeParse(new MethodNameNode(f), "mybase_", ParseStatus.valid, "", "", "", "");
    testNodeParse(new MethodNameNode(f), "def", ParseStatus.valid, "", "", "", "");
    testNodeParse(new MethodNameNode(f), "deF", ParseStatus.valid, "", "", "", "");
    testNodeParse(new MethodNameNode(f), "def_", ParseStatus.valid, "", "", "", "");
  });
  test("MethodNameUse", () => {
    testNodeParse(new MethodNameNode(f), "x", ParseStatus.valid, "", "", "", "");
    testNodeParse(new MethodNameNode(f), "x()", ParseStatus.valid, "x", "()", "", "");
    testNodeParse(new MethodNameNode(f), "_x", ParseStatus.valid, "", "", "", "");
    testNodeParse(new MethodNameNode(f), "_", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new MethodNameNode(f), "X", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new MethodNameNode(f), "def", ParseStatus.valid, "", "", "", "");
    testNodeParse(new MethodNameNode(f), "def()", ParseStatus.valid, "def", "()", "", ""); // keywords are no longer disallowed in method name USE - though won't compile
  });
  test("TypeNameDef", () => {
    testNodeParse(new TypeNameDef(f), "X", ParseStatus.valid, "", "", "", "");
    testNodeParse(new TypeNameDef(f), "_X", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new TypeNameDef(f), "_", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new TypeNameDef(f), "x", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new TypeNameDef(f), "Each", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new TypeNameDef(f), "Each_", ParseStatus.valid, "", "", "", "");
    testNodeParse(new TypeNameDef(f), "Int", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new TypeNameDef(f), "Float", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new TypeNameDef(f), "Boolean", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new TypeNameDef(f), "String", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new TypeNameDef(f), "List", ParseStatus.invalid, "", "", "", "");
  });
  test("TypeNameUse", () => {
    testNodeParse(new TypeNameUse(f), "X", ParseStatus.valid, "", "", "", "");
    testNodeParse(new TypeNameUse(f), "_X", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new TypeNameUse(f), "_", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new TypeNameUse(f), "x", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new TypeNameUse(f), "Async", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new TypeNameUse(f), "Async_", ParseStatus.valid, "", "", "", "");
    testNodeParse(new TypeNameUse(f), "Int", ParseStatus.valid, "", "", "", "");
    testNodeParse(new TypeNameUse(f), "Float", ParseStatus.valid, "", "", "", "");
    testNodeParse(new TypeNameUse(f), "Boolean", ParseStatus.valid, "", "", "", "");
    testNodeParse(new TypeNameUse(f), "String", ParseStatus.valid, "", "", "", "");
    testNodeParse(new TypeNameUse(f), "List", ParseStatus.valid, "", "", "", "");
  });
});
