import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { FieldImpl } from "../../src/ide/frames/fields/field-impl";
import { expressionFieldSpec } from "../../src/ide/frames/fields/field-spec";
import { FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { Assignment } from "../../src/ide/frames/statements/assignment";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import { testHash, transforms } from "../compiler/compiler-test-helpers";
import { testFieldParse } from "../testHelpers";

suite("Field Tests", () => {
  const fileImpl = new FileImpl(
    testHash,
    new Paradigm(""),
    "",
    transforms(),
    new StdLib(new StubInputOutput()),
    false,
    true,
  );

  test("Expression", () => {
    const field = new FieldImpl(new Assignment(fileImpl), expressionFieldSpec);

    testFieldParse(field, "123", true); // litInt

    testFieldParse(field, "+", false);
  });
});
