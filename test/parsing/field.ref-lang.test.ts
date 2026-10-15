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

    testFieldParse(
      field,
      "123",
      true,
      '<el-field id="elan_expr4" class="ok" tabindex="-1"><el-txt><el-lit>123</el-lit></el-txt><el-place><i>value or expression</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ExpressionField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
      "123",
      "123",
    ); // litInt

    testFieldParse(
      field,
      "+",
      false,
      "mismatched input '+' expecting {'if_', 'new', 'Int', 'Float', 'Boolean', 'String', 'List', 'true', 'false', 'not', 'this', '[', '(', '-', NAME_STARTING_LC, NAME_STARTING_UC, LITERAL_BINARY, LITERAL_HEX, LITERAL_INTEGER, LITERAL_FLOAT, LITERAL_REGEXP, LITERAL_STRING, INTERPOLATED_STRING}",
    );
  });
});
