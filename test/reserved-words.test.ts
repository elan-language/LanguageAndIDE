import { StdLib } from "../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../src/ide/frames/default-profile";
import { FileImpl } from "../src/ide/frames/file-impl";
import { IdentifierDef } from "../src/ide/frames/parse-nodes/identifier-def";
import { IdentifierUse } from "../src/ide/frames/parse-nodes/identifier-use";
import { MethodNameDef } from "../src/ide/frames/parse-nodes/method-name-def";
import { MethodNameUse } from "../src/ide/frames/parse-nodes/method-name-use";
import { TypeNameDef } from "../src/ide/frames/parse-nodes/type-name-def";
import { TypeNameUse } from "../src/ide/frames/parse-nodes/type-name-use";
import { ParseStatus } from "../src/ide/frames/status-enums";
import { StubInputOutput } from "../src/ide/stub-input-output";
import { hash } from "../src/ide/util";
import { transforms } from "./compiler/compiler-test-helpers";
import { testNodeParse } from "./testHelpers";

suite("Reserved Words", () => {
  const f = new FileImpl(
    hash,
    new DefaultProfile(),
    "",
    transforms(),
    new StdLib(new StubInputOutput()),
    false,
    true,
  );
  test("IdentifierDef", () => {
    testNodeParse(new IdentifierDef(f), "x", ParseStatus.valid, "", "", "", "");
    testNodeParse(new IdentifierDef(f), "_x", ParseStatus.valid, "", "", "", "");
    testNodeParse(new IdentifierDef(f), "_", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new IdentifierDef(f), "X", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new IdentifierDef(f), "strictfp", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new IdentifierDef(f), "strictFP", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new IdentifierDef(f), "strictfp_", ParseStatus.valid, "", "", "", "");
    testNodeParse(new IdentifierDef(f), "sizeof", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new IdentifierDef(f), "sizeOf", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new IdentifierDef(f), "sizeOf_", ParseStatus.valid, "", "", "", "");
  });
  test("IdentifierUse", () => {
    testNodeParse(new IdentifierUse(f), "x", ParseStatus.valid, "", "", "", "");
    testNodeParse(new IdentifierUse(f), "x.", ParseStatus.valid, "x", ".", "", "");
    testNodeParse(new IdentifierUse(f), "_x", ParseStatus.valid, "", "", "", "");
    testNodeParse(new IdentifierUse(f), "_", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new IdentifierUse(f), "X", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new IdentifierUse(f), "strictfp", ParseStatus.valid, "", "", "", ""); // because no following text; should be a compile error, though
    testNodeParse(new IdentifierUse(f), "strictfp.", ParseStatus.invalid, "", "strictfp.", "", "");
  });
  test("MethodNameDef", () => {
    testNodeParse(new MethodNameDef(f), "x", ParseStatus.valid, "", "", "", "");
    testNodeParse(new MethodNameDef(f), "_x", ParseStatus.valid, "", "", "", "");
    testNodeParse(new MethodNameDef(f), "_", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new MethodNameDef(f), "X", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new MethodNameDef(f), "mybase", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new MethodNameDef(f), "myBase", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new MethodNameDef(f), "mybase_", ParseStatus.valid, "", "", "", "");
    testNodeParse(new MethodNameDef(f), "def", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new MethodNameDef(f), "deF", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new MethodNameDef(f), "def_", ParseStatus.valid, "", "", "", "");
  });
  test("MethodNameUse", () => {
    testNodeParse(new MethodNameUse(f), "x", ParseStatus.valid, "", "", "", "");
    testNodeParse(new MethodNameUse(f), "x()", ParseStatus.valid, "x", "()", "", "");
    testNodeParse(new MethodNameUse(f), "_x", ParseStatus.valid, "", "", "", "");
    testNodeParse(new MethodNameUse(f), "_", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new MethodNameUse(f), "X", ParseStatus.invalid, "", "", "", "");
    testNodeParse(new MethodNameUse(f), "def", ParseStatus.valid, "", "", "", "");
    testNodeParse(new MethodNameUse(f), "def()", ParseStatus.valid, "def", "()", "", ""); // keywords are no longer disallowed in method name USE - though won't compile
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
