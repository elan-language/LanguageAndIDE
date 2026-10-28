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
import { Language } from "../../src/ide/frames/frame-interfaces/language";
import { ConcreteClass } from "../../src/ide/frames/globals/concrete-class";
import { Enum } from "../../src/ide/frames/globals/enum";
import { GlobalFunction } from "../../src/ide/frames/globals/global-function";
import { TestFrame } from "../../src/ide/frames/globals/test-frame";
import { LanguagePython } from "../../src/ide/frames/language-python";
import { Assignment } from "../../src/ide/frames/statements/assignment";
import { CatchClause } from "../../src/ide/frames/statements/catch-clause";
import { ProcedureCall } from "../../src/ide/frames/statements/procedureCall";
import { ThrowStatement } from "../../src/ide/frames/statements/throw-statement";
import { fileImplFor, testFieldParse } from "../testHelpers";

const python: Language = LanguagePython.Instance;

suite("Parsing Fields (New) Python", () => {
  test("ArgList", () => {
    const field = new FieldImpl(new Assignment(fileImplFor(python)), argListFieldSpec);
    testFieldParse(
      field,
      "123, a",
      true,
      '<el-field id="python_args4" class="optional ok" tabindex="-1"><el-txt><el-lit>123</el-lit>, <el-id>a</el-id></el-txt><el-place><i>arguments</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ArgListField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(
      field,
      "a",
      true,
      '<el-field id="python_args4" class="optional ok" tabindex="-1"><el-txt><el-id>a</el-id></el-txt><el-place><i>arguments</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ArgListField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );

    testFieldParse(field, "123 a", false, "");
    testFieldParse(
      field,
      "123,",
      false,
      //"mismatched input '<EOF>' expecting {'lambda', 'if_', 'new', 'Int', 'Float', 'Boolean', 'String', 'List', 'true', 'false', 'not', 'this', '[', '(', '-', NAME_STARTING_LC, NAME_STARTING_UC, LITERAL_BINARY, LITERAL_HEX, LITERAL_INTEGER, LITERAL_FLOAT, LITERAL_STRING, INTERPOLATED_STRING}",
    );
  });
  test("InputArgList", () => {
    const field = new FieldImpl(new Assignment(fileImplFor(python)), inputArgListFieldSpec);
    testFieldParse(
      field,
      `"age?", a`,
      true,
      '<el-field id="python_args4" class="ok" tabindex="-1"><el-txt>"<el-lit>age?</el-lit>", <el-id>a</el-id></el-txt><el-place><i>prompt message</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ArgListField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(
      field,
      "a",
      true,
      '<el-field id="python_args4" class="ok" tabindex="-1"><el-txt><el-id>a</el-id></el-txt><el-place><i>prompt message</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ArgListField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );

    testFieldParse(field, "123 a", false, "");
    testFieldParse(
      field,
      `"age?",`,
      false,
      //"mismatched input '<EOF>' expecting {'lambda', 'if_', 'new', 'Int', 'Float', 'Boolean', 'String', 'List', 'true', 'false', 'not', 'this', '[', '(', '-', NAME_STARTING_LC, NAME_STARTING_UC, LITERAL_BINARY, LITERAL_HEX, LITERAL_INTEGER, LITERAL_FLOAT, LITERAL_STRING, INTERPOLATED_STRING}",
    );
  });
  test("ParamList", () => {
    const field = new FieldImpl(new GlobalFunction(fileImplFor(python)), paramListFieldSpec);
    testFieldParse(
      field,
      "a: bool",
      true,
      '<el-field id="python_params8" class="optional ok" tabindex="-1"><el-txt><el-id>a</el-id>: <el-type>bool</el-type></el-txt><el-place><i>parameter definitions</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ParamListField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(
      field,
      "a: int, b: str",
      true,
      '<el-field id="python_params8" class="optional ok" tabindex="-1"><el-txt><el-id>a</el-id>: <el-type>int</el-type>, <el-id>b</el-id>: <el-type>str</el-type></el-txt><el-place><i>parameter definitions</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ParamListField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(field, "foo", false, "");
  });
  test("Identifier", () => {
    const field = new FieldImpl(new Assignment(fileImplFor(python)), identifierFieldSpec);
    testFieldParse(
      field,
      "a",
      true,
      '<el-field id="python_ident4" class="ok" tabindex="-1"><el-txt><el-id>a</el-id></el-txt><el-place><i>name</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#IdentifierField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(field, "A", false, "");
  });
  test("TestName", () => {
    const field = new FieldImpl(new TestFrame(fileImplFor(python)), testNameFieldSpec);
    testFieldParse(
      field,
      "test_a",
      true,
      '<el-field id="python_ident4" class="ok" tabindex="-1"><el-txt><el-method>test_a</el-method></el-txt><el-place>test_name</el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#IdentifierField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(field, "a", false, "");
  });
  test("ExceptionType", () => {
    const field = new FieldImpl(new CatchClause(fileImplFor(python)), exceptionTypeFieldSpec);
    testFieldParse(
      field,
      "ElanRuntimeError",
      true,
      '<el-field id="python_type4" class="ok" tabindex="-1"><el-txt><el-type>ElanRuntimeError</el-type></el-txt><el-place><i>type e.g. ElanRuntimeError or CustomError</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#TypeField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(
      field,
      "a",
      false,
      //"mismatched input 'a' expecting {'Int', 'Float', 'Boolean', 'String', 'List', NAME_STARTING_UC}",
    );
  });
  test("ExceptionMessage", () => {
    const field = new FieldImpl(new ThrowStatement(fileImplFor(python)), exceptionMessageFieldSpec);
    testFieldParse(
      field,
      `"foo"`,
      true,
      '<el-field id="python_msg4" class="ok" tabindex="-1"><el-txt>"<el-lit>foo</el-lit>"</el-txt><el-place><i>message</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ExceptionMessageField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(
      field,
      `foo`,
      true,
      '<el-field id="python_msg4" class="ok" tabindex="-1"><el-txt><el-id>foo</el-id></el-txt><el-place><i>message</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ExceptionMessageField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(field, "foo()", false, "");
  });
  test("TypeName", () => {
    const field = new FieldImpl(new ConcreteClass(fileImplFor(python)), typeNameFieldSpec);
    testFieldParse(
      field,
      "Foo",
      true,
      '<el-field id="python_type15" class="ok" tabindex="-1"><el-txt><el-type>Foo</el-type></el-txt><el-place><i>Name</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#TypeNameField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(
      field,
      "foo",
      false,
      //"mismatched input 'foo' expecting {'Int', 'Float', 'Boolean', 'String', 'List', NAME_STARTING_UC}",
    );
  });
  test("Comment", () => {
    const field = new FieldImpl(new CommentFrame(fileImplFor(python)), commentFieldSpec);
    testFieldParse(
      field,
      "# foo",
      true,
      '<el-field id="python_comment3" class="ok" tabindex="-1"><el-txt># foo</el-txt><el-place># <i>comment</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#CommentField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(
      field,
      "#",
      true,
      '<el-field id="python_comment3" class="ok" tabindex="-1"><el-txt>#</el-txt><el-place># <i>comment</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#CommentField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(field, "foo", false, "");
  });
  test("InheritsFrom", () => {
    const field = new FieldImpl(new Assignment(fileImplFor(python)), inheritsFromFieldSpec);
    testFieldParse(
      field,
      "Bar",
      true,
      '<el-field id="python_text4" class="optional ok" tabindex="-1"><el-txt><el-type>Bar</el-type></el-txt><el-place><i>inheritance</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#InheritsFromField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
      "Bar",
    );
    testFieldParse(field, "inherits Bar", false, "");
    testFieldParse(field, "Bar, Yon", false, "");
  });
  test("MethodName", () => {
    const field = new FieldImpl(new GlobalFunction(fileImplFor(python)), methodNameFieldSpec);
    testFieldParse(
      field,
      "fooBar",
      true,
      '<el-field id="python_ident8" class="ok" tabindex="-1"><el-txt><el-method>fooBar</el-method></el-txt><el-place><i>name</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#MethodNameField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(
      field,
      "fooBar_",
      true,
      '<el-field id="python_ident8" class="ok" tabindex="-1"><el-txt><el-method>fooBar_</el-method></el-txt><el-place><i>name</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#MethodNameField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(field, "foo()", false, "");
  });
  test("ProcRef", () => {
    const field = new FieldImpl(new ProcedureCall(fileImplFor(python)), procRefFieldSpec);
    testFieldParse(
      field,
      "sleep",
      true,
      '<el-field id="python_ident4" class="ok" tabindex="-1"><el-txt><el-method>sleep</el-method></el-txt><el-place><i>procedureName</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ProcRefField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(
      field,
      "bg.put",
      true,
      '<el-field id="python_ident4" class="ok" tabindex="-1"><el-txt><el-id>bg</el-id>.<el-method>put</el-method></el-txt><el-place><i>procedureName</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ProcRefField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(field, "sleep()", false, "");
  });
  test("EnumValues", () => {
    const field = new FieldImpl(new Enum(fileImplFor(python)), enumValuesFieldSpec);
    testFieldParse(
      field,
      "foo, bar",
      true,
      '<el-field id="python_enumVals4" class="ok" tabindex="-1"><el-txt><el-id>foo</el-id>, <el-id>bar</el-id></el-txt><el-place><i>values</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#AbstractField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
    );
    testFieldParse(field, "foo", false, "");
    testFieldParse(field, "Foo", false, "");
    testFieldParse(field, "foo bar", false, "", "");
    testFieldParse(field, "foo, ", false, "");
  });
  test("Expression", () => {
    const field = new FieldImpl(new Assignment(fileImplFor(python)), expressionFieldSpec);

    testFieldParse(
      field,
      "123",
      true,
      '<el-field id="python_expr4" class="ok" tabindex="-1"><el-txt><el-lit>123</el-lit></el-txt><el-place><i>value or expression</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ExpressionField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
      "123",
      "123",
    ); // litInt

    testFieldParse(
      field,
      "+",
      false,
      //"mismatched input '+' expecting {'if_', 'new', 'Int', 'Float', 'Boolean', 'String', 'List', 'true', 'false', 'not', 'this', '[', '(', '-', NAME_STARTING_LC, NAME_STARTING_UC, LITERAL_BINARY, LITERAL_HEX, LITERAL_INTEGER, LITERAL_FLOAT, LITERAL_STRING, INTERPOLATED_STRING}",
    );
  });
  test("PrintExpression", () => {
    const field = new FieldImpl(new Assignment(fileImplFor(python)), printExpressionFieldSpec);

    testFieldParse(
      field,
      "123",
      true,
      '<el-field id="python_expr4" class="ok" tabindex="-1"><el-txt><el-lit>123</el-lit></el-txt><el-place><i>value or expression</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ExpressionField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
      "123",
      "123",
    ); // litInt

    testFieldParse(
      field,
      "+",
      false,
      //"mismatched input '+' expecting {'if_', 'new', 'Int', 'Float', 'Boolean', 'String', 'List', 'true', 'false', 'not', 'this', '[', '(', '-', NAME_STARTING_LC, NAME_STARTING_UC, LITERAL_BINARY, LITERAL_HEX, LITERAL_INTEGER, LITERAL_FLOAT, LITERAL_STRING, INTERPOLATED_STRING}",
    );
  });
  test("AssertActual", () => {
    const field = new FieldImpl(new Assignment(fileImplFor(python)), assertActualFieldSpec);

    testFieldParse(
      field,
      "sqrt(2)",
      true,
      '<el-field id="python_expr4" class="ok" tabindex="-1"><el-txt><el-method>sqrt</el-method>(<el-lit>2</el-lit>)</el-txt><el-place><i>actual (computed) value</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#AssertActualField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
      "sqrt(2)",
      "sqrt(2)",
    );

    testFieldParse(
      field,
      "+",
      false,
      //"mismatched input '+' expecting {'if_', 'new', 'Int', 'Float', 'Boolean', 'String', 'List', 'true', 'false', 'not', 'this', '[', '(', '-', NAME_STARTING_LC, NAME_STARTING_UC, LITERAL_BINARY, LITERAL_HEX, LITERAL_INTEGER, LITERAL_FLOAT, LITERAL_STRING, INTERPOLATED_STRING}",
    );
  });
  test("AssertExpected", () => {
    const field = new FieldImpl(new Assignment(fileImplFor(python)), assertExpectedFieldSpec);

    testFieldParse(
      field,
      "1.4142135623730951",
      true,
      '<el-field id="python_expr4" class="ok" tabindex="-1"><el-txt><el-lit>1.4142135623730951</el-lit></el-txt><el-place><i>expected value or expression</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ExpressionField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
      "1.4142135623730951",
      "1.4142135623730951",
    );

    testFieldParse(
      field,
      "[1, 2]",
      true,
      '<el-field id="python_expr4" class="ok" tabindex="-1"><el-txt>[<el-lit>1</el-lit>, <el-lit>2</el-lit>]</el-txt><el-place><i>expected value or expression</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ExpressionField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
      "[1, 2]",
      "[1, 2]",
    );

    testFieldParse(field, "foo()", false, "");
    testFieldParse(field, "3 + 4", false, "");
  });
  test("Assignable", () => {
    const field = new FieldImpl(new Assignment(fileImplFor(python)), assignableFieldSpec);

    testFieldParse(
      field,
      "a",
      true,
      '<el-field id="python_ident4" class="ok" tabindex="-1"><el-txt><el-id>a</el-id></el-txt><el-place><i>variable</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#AssignableField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
      "a",
      "a",
    );
    testFieldParse(
      field,
      "a[1][2]",
      true,
      '<el-field id="python_ident4" class="ok" tabindex="-1"><el-txt><el-id>a</el-id>[<el-lit>1</el-lit>][<el-lit>2</el-lit>]</el-txt><el-place><i>variable</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#AssignableField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
      "a[1][2]",
      "a[1][2]",
    );
    testFieldParse(
      field,
      "self.a",
      true,
      '<el-field id="python_ident4" class="ok" tabindex="-1"><el-txt><el-kw>self</el-kw>.<el-id>a</el-id></el-txt><el-place><i>variable</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#AssignableField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
      "self.a",
      "self.a",
    );

    testFieldParse(field, "foo()", false, "");
  });
  test("ConstantValue", () => {
    const field = new FieldImpl(new Assignment(fileImplFor(python)), constantValueFieldSpec);

    testFieldParse(
      field,
      "1.4142135623730951",
      true,
      '<el-field id="python_text4" class="ok" tabindex="-1"><el-txt><el-lit>1.4142135623730951</el-lit></el-txt><el-place><i>literal</i></el-place><el-msg></el-msg><el-help title="Click to open Help for this field"><a href="documentation/LangRef.html#ConstantValueField" target="help-iframe" tabindex="-1">?</a></el-help></el-field>',
      "1.4142135623730951",
      "1.4142135623730951",
    );
    testFieldParse(field, "a", false, "");
    testFieldParse(field, "3 + 4", false, "");
  });
});
