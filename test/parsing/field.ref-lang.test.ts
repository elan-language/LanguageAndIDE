import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { FieldImpl } from "../../src/ide/frames/fields/field-impl";
import {
  argListFieldSpec,
  expressionFieldSpec,
  identifierFieldSpec,
  inputArgListFieldSpec,
  paramListFieldSpec,
  typeNameFieldSpec,
} from "../../src/ide/frames/fields/field-spec";
import { FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { Assignment } from "../../src/ide/frames/statements/assignment";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import { testHash, transforms } from "../compiler/compiler-test-helpers";
import { testFieldParse } from "../testHelpers";

suite("Field Tests", () => {
  test("TypeName", () => {
    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    const field = new FieldImpl(new Assignment(fileImpl), typeNameFieldSpec);
    testFieldParse(
      field,
      "Foo",
      true,
      '<el-field id="elan_type4" class="ok" tabindex="-1"><el-txt><el-type>Foo</el-type></el-txt><el-place><i>Name</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#TypeNameField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(
      field,
      "foo",
      false,
      "mismatched input 'foo' expecting {'Int', 'Float', 'Boolean', 'String', 'List', NAME_STARTING_UC}",
    );
  });

  test("ArgList", () => {
    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    const field = new FieldImpl(new Assignment(fileImpl), argListFieldSpec);
    testFieldParse(
      field,
      "123, a",
      true,
      '<el-field id="elan_args4" class="optional ok" tabindex="-1"><el-txt><el-lit>123</el-lit>, <el-id>a</el-id></el-txt><el-place><i>arguments</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ArgListField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(
      field,
      "a",
      true,
      '<el-field id="elan_args4" class="optional ok" tabindex="-1"><el-txt><el-id>a</el-id></el-txt><el-place><i>arguments</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ArgListField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );

    testFieldParse(field, "123 a", false, "");
    testFieldParse(
      field,
      "123,",
      false,
      "mismatched input '<EOF>' expecting {'lambda', 'if_', 'new', 'Int', 'Float', 'Boolean', 'String', 'List', 'true', 'false', 'not', 'this', '[', '(', '-', NAME_STARTING_LC, NAME_STARTING_UC, LITERAL_BINARY, LITERAL_HEX, LITERAL_INTEGER, LITERAL_FLOAT, LITERAL_REGEXP, LITERAL_STRING, INTERPOLATED_STRING}",
    );
  });

  test("InputArgList", () => {
    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    const field = new FieldImpl(new Assignment(fileImpl), inputArgListFieldSpec);
    testFieldParse(
      field,
      `"age?", a`,
      true,
      '<el-field id="elan_args4" class="ok" tabindex="-1"><el-txt>"<el-lit>age?</el-lit>", <el-id>a</el-id></el-txt><el-place><i>prompt message</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ArgListField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(
      field,
      "a",
      true,
      '<el-field id="elan_args4" class="ok" tabindex="-1"><el-txt><el-id>a</el-id></el-txt><el-place><i>prompt message</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ArgListField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );

    testFieldParse(field, "123 a", false, "");
    testFieldParse(
      field,
      `"age?",`,
      false,
      "mismatched input '<EOF>' expecting {'lambda', 'if_', 'new', 'Int', 'Float', 'Boolean', 'String', 'List', 'true', 'false', 'not', 'this', '[', '(', '-', NAME_STARTING_LC, NAME_STARTING_UC, LITERAL_BINARY, LITERAL_HEX, LITERAL_INTEGER, LITERAL_FLOAT, LITERAL_REGEXP, LITERAL_STRING, INTERPOLATED_STRING}",
    );
  });

  test("ParamList", () => {
    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    const field = new FieldImpl(new Assignment(fileImpl), paramListFieldSpec);
    testFieldParse(
      field,
      "a as Int, b as String",
      true,
      '<el-field id="elan_params4" class="optional ok" tabindex="-1"><el-txt><el-id>a</el-id> <el-kw>as</el-kw> <el-type>Int</el-type>, <el-id>b</el-id> <el-kw>as</el-kw> <el-type>String</el-type></el-txt><el-place><i>parameter definitions</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ParamListField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(
      field,
      "a as Boolean",
      true,
      '<el-field id="elan_params4" class="optional ok" tabindex="-1"><el-txt><el-id>a</el-id> <el-kw>as</el-kw> <el-type>Boolean</el-type></el-txt><el-place><i>parameter definitions</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ParamListField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(field, "foo", false, "mismatched input '<EOF>' expecting 'as'");
  });

  test("Expression", () => {
    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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

  test("Identifier", () => {
    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    const field = new FieldImpl(new Assignment(fileImpl), identifierFieldSpec);
    testFieldParse(
      field,
      "a",
      true,
      '<el-field id="elan_ident4" class="ok" tabindex="-1"><el-txt><el-id>a</el-id></el-txt><el-place><i>name</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#IdentifierField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(field, "A", false, "mismatched input 'A' expecting NAME_STARTING_LC");
  });
});
