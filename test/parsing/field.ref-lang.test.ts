import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CommentFrame } from "../../src/ide/frames/comment-frame";
import { FieldImpl } from "../../src/ide/frames/fields/field-impl";
import {
  argListFieldSpec,
  assertActualFieldSpec,
  assertExpectedFieldSpec,
  assignableFieldSpec,
  commentFieldSpec,
  constantValueFieldSpec,
  enumValuesFieldSpec,
  exceptionMessageFieldSpec,
  exceptionTypeFieldSpec,
  expressionFieldSpec,
  identifierFieldSpec,
  inheritsFromFieldSpec,
  inputArgListFieldSpec,
  methodNameFieldSpec,
  paramListFieldSpec,
  printExpressionFieldSpec,
  procRefFieldSpec,
  testNameFieldSpec,
  typeNameFieldSpec,
} from "../../src/ide/frames/fields/field-spec";
import { FileImpl } from "../../src/ide/frames/file-impl";
import { ConcreteClass } from "../../src/ide/frames/globals/concrete-class";
import { Enum } from "../../src/ide/frames/globals/enum";
import { GlobalFunction } from "../../src/ide/frames/globals/global-function";
import { TestFrame } from "../../src/ide/frames/globals/test-frame";
import { LanguageElan } from "../../src/ide/frames/language-elan";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { Assignment } from "../../src/ide/frames/statements/assignment";
import { CatchClause } from "../../src/ide/frames/statements/catch-clause";
import { ProcedureCall } from "../../src/ide/frames/statements/procedureCall";
import { ThrowStatement } from "../../src/ide/frames/statements/throw-statement";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import { ignore_test, testHash, transforms } from "../compiler/compiler-test-helpers";
import { testFieldParse } from "../testHelpers";

function fileImpl() {
  const file = new FileImpl(
    testHash,
    new Paradigm(""),
    "",
    transforms(),
    new StdLib(new StubInputOutput()),
    false,
    true,
  );
  file.setLanguage(LanguageElan.Instance);
  return file;
}

suite("Field Tests - RefLang", () => {
  test("ArgList", () => {
    const field = new FieldImpl(new Assignment(fileImpl()), argListFieldSpec);
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
      "mismatched input '<EOF>' expecting {'lambda', 'if_', 'new', 'Int', 'Float', 'Boolean', 'String', 'List', 'true', 'false', 'not', 'this', '[', '(', '-', NAME_STARTING_LC, NAME_STARTING_UC, LITERAL_BINARY, LITERAL_HEX, LITERAL_INTEGER, LITERAL_FLOAT, LITERAL_STRING, INTERPOLATED_STRING}",
    );
  });
  test("InputArgList", () => {
    const field = new FieldImpl(new Assignment(fileImpl()), inputArgListFieldSpec);
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
      "mismatched input '<EOF>' expecting {'lambda', 'if_', 'new', 'Int', 'Float', 'Boolean', 'String', 'List', 'true', 'false', 'not', 'this', '[', '(', '-', NAME_STARTING_LC, NAME_STARTING_UC, LITERAL_BINARY, LITERAL_HEX, LITERAL_INTEGER, LITERAL_FLOAT, LITERAL_STRING, INTERPOLATED_STRING}",
    );
  });
  test("ParamList", () => {
    const field = new FieldImpl(new GlobalFunction(fileImpl()), paramListFieldSpec);
    testFieldParse(
      field,
      "a as Int, b as String",
      true,
      '<el-field id="elan_params8" class="optional ok" tabindex="-1"><el-txt><el-id>a</el-id> <el-kw>as</el-kw> <el-type>Int</el-type>, <el-id>b</el-id> <el-kw>as</el-kw> <el-type>String</el-type></el-txt><el-place><i>parameter definitions</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ParamListField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(
      field,
      "a as Boolean",
      true,
      '<el-field id="elan_params8" class="optional ok" tabindex="-1"><el-txt><el-id>a</el-id> <el-kw>as</el-kw> <el-type>Boolean</el-type></el-txt><el-place><i>parameter definitions</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ParamListField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(field, "foo", false, "mismatched input '<EOF>' expecting 'as'");
  });
  test("Identifier", () => {
    const field = new FieldImpl(new Assignment(fileImpl()), identifierFieldSpec);
    testFieldParse(
      field,
      "a",
      true,
      '<el-field id="elan_ident4" class="ok" tabindex="-1"><el-txt><el-id>a</el-id></el-txt><el-place><i>name</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#IdentifierField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(field, "A", false, "mismatched input 'A' expecting NAME_STARTING_LC");
  });
  test("TestName", () => {
    const field = new FieldImpl(new TestFrame(fileImpl()), testNameFieldSpec);
    testFieldParse(
      field,
      "test_a",
      true,
      '<el-field id="elan_ident4" class="ok" tabindex="-1"><el-txt><el-method>test_a</el-method></el-txt><el-place>test_name</el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#IdentifierField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(field, "a", false, "mismatched input 'a' expecting NAME_STARTING_TEST_");
  });
  test("ExceptionType", () => {
    const field = new FieldImpl(new CatchClause(fileImpl()), exceptionTypeFieldSpec);
    testFieldParse(
      field,
      "ElanRuntimeError",
      true,
      '<el-field id="elan_type5" class="ok" tabindex="-1"><el-txt><el-type>ElanRuntimeError</el-type></el-txt><el-place><i>type e.g. ElanRuntimeError or CustomError</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#TypeField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(
      field,
      "a",
      false,
      "mismatched input 'a' expecting {'Int', 'Float', 'Boolean', 'String', 'List', NAME_STARTING_UC}",
    );
  });
  test("ExceptionMessage", () => {
    const field = new FieldImpl(new ThrowStatement(fileImpl()), exceptionMessageFieldSpec);
    testFieldParse(
      field,
      `"foo"`,
      true,
      '<el-field id="elan_msg4" class="ok" tabindex="-1"><el-txt>"<el-lit>foo</el-lit>"</el-txt><el-place><i>message</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ExceptionMessageField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(
      field,
      `foo`,
      true,
      '<el-field id="elan_msg4" class="ok" tabindex="-1"><el-txt><el-id>foo</el-id></el-txt><el-place><i>message</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ExceptionMessageField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(field, "foo()", false, "");
  });
  test("TypeName", () => {
    const field = new FieldImpl(new ConcreteClass(fileImpl()), typeNameFieldSpec);
    testFieldParse(
      field,
      "Foo",
      true,
      '<el-field id="elan_type15" class="ok" tabindex="-1"><el-txt><el-type>Foo</el-type></el-txt><el-place><i>Name</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#TypeNameField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(
      field,
      "foo",
      false,
      "mismatched input 'foo' expecting {'Int', 'Float', 'Boolean', 'String', 'List', NAME_STARTING_UC}",
    );
  });
  test("Comment", () => {
    const field = new FieldImpl(new CommentFrame(fileImpl()), commentFieldSpec);
    testFieldParse(
      field,
      "# foo",
      true,
      '<el-field id="elan_comment3" class="ok" tabindex="-1"><el-txt># foo</el-txt><el-place># <i>comment</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#CommentField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(
      field,
      "#",
      true,
      '<el-field id="elan_comment3" class="ok" tabindex="-1"><el-txt>#</el-txt><el-place># <i>comment</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#CommentField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(field, "foo", false, "mismatched input 'foo' expecting COMMENT");
  });
  test("InheritsFrom", () => {
    const field = new FieldImpl(new Assignment(fileImpl()), inheritsFromFieldSpec);
    testFieldParse(
      field,
      "Bar",
      true,
      '<el-field id="elan_text4" class="optional ok" tabindex="-1"><el-txt><el-type>Bar</el-type></el-txt><el-place><i>inheritance</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#InheritsFromField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
      "Bar",
    );
    testFieldParse(field, "inherits Bar", false, "");
    testFieldParse(field, "Bar, Yon", false, "");
  });
  test("MethodName", () => {
    const field = new FieldImpl(new GlobalFunction(fileImpl()), methodNameFieldSpec);
    testFieldParse(
      field,
      "fooBar",
      true,
      '<el-field id="elan_ident8" class="ok" tabindex="-1"><el-txt><el-method>fooBar</el-method></el-txt><el-place><i>name</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#MethodNameField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(
      field,
      "fooBar_",
      true,
      '<el-field id="elan_ident8" class="ok" tabindex="-1"><el-txt><el-method>fooBar_</el-method></el-txt><el-place><i>name</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#MethodNameField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(field, "foo()", false, "");
  });
  test("ProcRef", () => {
    const field = new FieldImpl(new ProcedureCall(fileImpl()), procRefFieldSpec);
    testFieldParse(
      field,
      "sleep()",
      true,
      '<el-field id="elan_ident3" class="ok" tabindex="-1"><el-txt><el-method>sleep</el-method>()</el-txt><el-place><i>procedureCall</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ProcRefField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(
      field,
      "bg.put()",
      true,
      '<el-field id="elan_ident3" class="ok" tabindex="-1"><el-txt><el-id>bg</el-id>.<el-method>put</el-method>()</el-txt><el-place><i>procedureCall</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ProcRefField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(field, "sleep()", true, "");
  });
  test("EnumValues", () => {
    const field = new FieldImpl(new Enum(fileImpl()), enumValuesFieldSpec);
    testFieldParse(
      field,
      "foo, bar",
      true,
      '<el-field id="elan_enumVals4" class="ok" tabindex="-1"><el-txt><el-id>foo</el-id>, <el-id>bar</el-id></el-txt><el-place><i>values</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#AbstractField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(field, "foo", false, `mismatched input '<EOF>' expecting ','`);
    testFieldParse(field, "Foo", false, "mismatched input 'Foo' expecting NAME_STARTING_LC");
    testFieldParse(field, "foo bar", false, "mismatched input 'bar' expecting ','");
    testFieldParse(field, "foo, ", false, "missing NAME_STARTING_LC at '<EOF>'");
  });
  test("Expression", () => {
    const field = new FieldImpl(new Assignment(fileImpl()), expressionFieldSpec);

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
      "mismatched input '+' expecting {'if_', 'new', 'Int', 'Float', 'Boolean', 'String', 'List', 'true', 'false', 'not', 'this', '[', '(', '-', NAME_STARTING_LC, NAME_STARTING_UC, LITERAL_BINARY, LITERAL_HEX, LITERAL_INTEGER, LITERAL_FLOAT, LITERAL_STRING, INTERPOLATED_STRING}",
    );
  });
  test("PrintExpression", () => {
    const field = new FieldImpl(new Assignment(fileImpl()), printExpressionFieldSpec);
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
      "mismatched input '+' expecting {'if_', 'new', 'Int', 'Float', 'Boolean', 'String', 'List', 'true', 'false', 'not', 'this', '[', '(', '-', NAME_STARTING_LC, NAME_STARTING_UC, LITERAL_BINARY, LITERAL_HEX, LITERAL_INTEGER, LITERAL_FLOAT, LITERAL_STRING, INTERPOLATED_STRING}",
    );
  });
  test("AssertActual", () => {
    const field = new FieldImpl(new Assignment(fileImpl()), assertActualFieldSpec);

    testFieldParse(
      field,
      "sqrt(2)",
      true,
      '<el-field id="elan_expr4" class="ok" tabindex="-1"><el-txt><el-method>sqrt</el-method>(<el-lit>2</el-lit>)</el-txt><el-place><i>actual (computed) value</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#AssertActualField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
      "sqrt(2)",
      "sqrt(2)",
    );

    testFieldParse(
      field,
      "+",
      false,
      "mismatched input '+' expecting {'if_', 'new', 'Int', 'Float', 'Boolean', 'String', 'List', 'true', 'false', 'not', 'this', '[', '(', '-', NAME_STARTING_LC, NAME_STARTING_UC, LITERAL_BINARY, LITERAL_HEX, LITERAL_INTEGER, LITERAL_FLOAT, LITERAL_STRING, INTERPOLATED_STRING}",
    );
  });
  test("AssertExpected", () => {
    const field = new FieldImpl(new Assignment(fileImpl()), assertExpectedFieldSpec);

    testFieldParse(
      field,
      "1.4142135623730951",
      true,
      '<el-field id="elan_expr4" class="ok" tabindex="-1"><el-txt><el-lit>1.4142135623730951</el-lit></el-txt><el-place><i>expected value or expression</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ExpressionField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
      "1.4142135623730951",
      "1.4142135623730951",
    );

    testFieldParse(
      field,
      "[1, 2]",
      true,
      '<el-field id="elan_expr4" class="ok" tabindex="-1"><el-txt>[<el-lit>1</el-lit>, <el-lit>2</el-lit>]</el-txt><el-place><i>expected value or expression</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ExpressionField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
      "[1, 2]",
      "[1, 2]",
    );

    testFieldParse(field, "foo()", false, "");
    testFieldParse(field, "3 + 4", false, "");
  });
  test("Assignable", () => {
    const field = new FieldImpl(new Assignment(fileImpl()), assignableFieldSpec);

    testFieldParse(
      field,
      "a",
      true,
      '<el-field id="elan_ident4" class="ok" tabindex="-1"><el-txt><el-id>a</el-id></el-txt><el-place><i>variable</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#AssignableField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
      "a",
      "a",
    );
    testFieldParse(
      field,
      "a[1][2]",
      true,
      '<el-field id="elan_ident4" class="ok" tabindex="-1"><el-txt><el-id>a</el-id>[<el-lit>1</el-lit>][<el-lit>2</el-lit>]</el-txt><el-place><i>variable</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#AssignableField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
      "a[1][2]",
      "a[1][2]",
    );
    testFieldParse(
      field,
      "this.a",
      true,
      '<el-field id="elan_ident4" class="ok" tabindex="-1"><el-txt><el-kw>this</el-kw>.<el-id>a</el-id></el-txt><el-place><i>variable</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#AssignableField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
      "this.a",
      "this.a",
    );

    testFieldParse(field, "foo()", false, "");
  });
  test("ConstantValue", () => {
    const field = new FieldImpl(new Assignment(fileImpl()), constantValueFieldSpec);

    testFieldParse(
      field,
      "1.4142135623730951",
      true,
      '<el-field id="elan_text4" class="ok" tabindex="-1"><el-txt><el-lit>1.4142135623730951</el-lit></el-txt><el-place><i>literal</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ConstantValueField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
      "1.4142135623730951",
      "1.4142135623730951",
    );
    testFieldParse(field, "a", false, "");
    testFieldParse(field, "3 + 4", false, "");
  });
});
