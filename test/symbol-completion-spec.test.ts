import assert from "assert";
import { Alternatives } from "../src/frames/parse-nodes/alternatives";
import { AssignableNode } from "../src/frames/parse-nodes/assignable-node";
import { BinaryExpression } from "../src/frames/parse-nodes/binary-expression";
import { BinaryOperation } from "../src/frames/parse-nodes/binary-operation";
import { ExprNode } from "../src/frames/parse-nodes/expr-node";
import { IdentifierNode } from "../src/frames/parse-nodes/identifier-node";
import { InstanceProcRef } from "../src/frames/parse-nodes/instanceProcRef";
import { KeywordNode } from "../src/frames/parse-nodes/keyword-node";
import { LitValueNode } from "../src/frames/parse-nodes/lit-value";
import { MethodCallNode } from "../src/frames/parse-nodes/method-call-node";
import { ReferenceNode } from "../src/frames/parse-nodes/reference-node";
import { TermSimple } from "../src/frames/parse-nodes/term-simple";
import { TypeSimpleNode } from "../src/frames/parse-nodes/type-simple-node";
import { TypeSimpleOrGeneric } from "../src/frames/parse-nodes/type-simple-or-generic";
import { ParseStatus } from "../src/frames/status-enums";
import { TokenType } from "../src/frames/symbol-completion-helpers";
import { testSymbolCompletionSpec } from "./testHelpers";

suite("Symbol Completion Spec", () => {
  test("MethodCallNode", () => {
    testSymbolCompletionSpec(
      new MethodCallNode(),
      "x",
      ParseStatus.incomplete,
      IdentifierNode.name,
      "x",
      [TokenType.method_function, TokenType.method_system],
      [],
    );
  });
  test("Reference1", () => {
    testSymbolCompletionSpec(
      new ReferenceNode(),
      "r",
      ParseStatus.valid,
      ReferenceNode.name,
      "r",
      [
        TokenType.id_constant, //TODO: sort these into alphabetic order?
        TokenType.id_let,
        TokenType.id_parameter_out,
        TokenType.id_parameter_regular,
        TokenType.id_property,
        TokenType.id_variable,
        TokenType.id_enumValue,
        TokenType.method_function,
        TokenType.method_system,
      ],
      ["ref"],
    );
  });
  test("Reference2", () => {
    testSymbolCompletionSpec(
      new ReferenceNode(),
      "t",
      ParseStatus.valid,
      ReferenceNode.name,
      "t",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_out,
        TokenType.id_parameter_regular,
        TokenType.id_property,
        TokenType.id_variable,
        TokenType.id_enumValue,
        TokenType.method_function,
        TokenType.method_system,
      ],
      ["this"],
    );
  });
  test("Expression1", () => {
    testSymbolCompletionSpec(
      new ExprNode(),
      "t",
      ParseStatus.valid,
      TermSimple.name, //because t could be start of literal boolean, or typeof  also
      "t",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_out,
        TokenType.id_parameter_regular,
        TokenType.id_property,
        TokenType.id_variable,
        TokenType.id_enumValue,
        TokenType.method_function,
        TokenType.method_system,
      ],
      ["true", "this", "typeof"],
    );
  });
  test("Expression2", () => {
    testSymbolCompletionSpec(
      new ExprNode(),
      "th",
      ParseStatus.valid,
      ReferenceNode.name, //because t could be start of literal boolean, or typeof  also
      "th",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_out,
        TokenType.id_parameter_regular,
        TokenType.id_property,
        TokenType.id_variable,
        TokenType.id_enumValue,
        TokenType.method_function,
        TokenType.method_system,
      ],
      ["this"],
    );
  });
  test("TermSimple", () => {
    testSymbolCompletionSpec(
      new TermSimple(),
      "t",
      ParseStatus.valid,
      TermSimple.name, //coming back as Alternatives
      "t",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_out,
        TokenType.id_parameter_regular,
        TokenType.id_property,
        TokenType.id_variable,
        TokenType.id_enumValue,
        TokenType.method_function,
        TokenType.method_system,
      ],
      ["true", "this", "typeof"],
    );
  });
  test("LitValueNode", () => {
    testSymbolCompletionSpec(
      new LitValueNode(),
      "t",
      ParseStatus.incomplete,
      KeywordNode.name,
      "t",
      [],
      ["true"],
    );
  });
  test("Expression_Empty", () => {
    testSymbolCompletionSpec(
      new ExprNode(),
      "",
      ParseStatus.empty,
      ExprNode.name,
      "",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_out,
        TokenType.id_parameter_regular,
        TokenType.id_property,
        TokenType.id_variable,
        TokenType.id_enumValue,
        TokenType.method_function,
        TokenType.method_system,
      ],
      ["new,copy,if,lambda,empty,this,ref,not"], // Not showing 'this,ref' - which should be coming from Term
    );
  });
  test("Expression3", () => {
    testSymbolCompletionSpec(
      new ExprNode(),
      "Foo",
      ParseStatus.incomplete,
      TypeSimpleNode.name,
      "Foo",
      [TokenType.type_enum],
      [],
    );
  });
  test("Expression4", () => {
    testSymbolCompletionSpec(
      new ExprNode(),
      "empty [I",
      ParseStatus.incomplete,
      Alternatives.name,
      "I",
      [TokenType.type_concrete],
      [],
    );
  });
  test("Assignable", () => {
    testSymbolCompletionSpec(
      new AssignableNode(),
      "property.f",
      ParseStatus.valid,
      IdentifierNode.name, //Because can be a term, or a binary expression
      "f",
      [TokenType.id_property],
      [],
    );
  });
  test("InstanceProcRef", () => {
    testSymbolCompletionSpec(
      new InstanceProcRef(),
      "foo.",
      ParseStatus.incomplete,
      IdentifierNode.name,
      "",
      [TokenType.method_procedure],
      [],
      "foo",
    );
  });
  test("Expression_new", () => {
    testSymbolCompletionSpec(
      new ExprNode(),
      "new ",
      ParseStatus.incomplete,
      TypeSimpleOrGeneric.name,
      "",
      [TokenType.type_concrete],
      [],
    );
  });
  test("Expression_functionDotCall", () => {
    testSymbolCompletionSpec(
      new ExprNode(),
      "foo().",
      ParseStatus.incomplete,
      Alternatives.name,
      "",
      [TokenType.id_property, TokenType.method_function, TokenType.method_system],
      [],
    );
  });
  test("Expression_instanceDotCall", () => {
    testSymbolCompletionSpec(
      new ExprNode(),
      "foo.",
      ParseStatus.incomplete,
      Alternatives.name,
      "",
      [TokenType.id_property, TokenType.method_function, TokenType.method_system],
      [],
    );
  });
  test("InstanceProcRef", () => {
    testSymbolCompletionSpec(
      new InstanceProcRef(),
      "foo.wi",
      ParseStatus.valid,
      IdentifierNode.name,
      "wi",
      [TokenType.method_procedure],
      [],
      "foo",
    );
  });
  test("RegexForExtractingContext", () => {
    const rgx = /(.*\.)*(([A-Za-z_]*)(\(.*\))*)\..*/;
    const test1 = "foo.bar().yon((3+4)*5).qux";
    assert.equal(test1.match(rgx)![3], "yon");
    const test2 = "foo.bar().yon((3+4)*5).";
    assert.equal(test2.match(rgx)![3], "yon");
    const test3 = "foo.bar().yon((3+4)*5)";
    assert.equal(test3.match(rgx)![3], "bar");
    const test4 = "foo.";
    assert.equal(test4.match(rgx)![3], "foo");
    const test5 = "foo";
    assert.equal(rgx.test(test5), false);
    const test6 = "foo(bar)";
    assert.equal(rgx.test(test6), false);
  });
  test("BinaryExpression", () => {
    testSymbolCompletionSpec(
      new BinaryExpression(),
      "a ",
      ParseStatus.incomplete,
      BinaryOperation.name,
      " ",
      [],
      ["and", "div", "is", "isnt", "mod", "or"],
      "",
    );
  });
  test("BinaryExpression", () => {
    testSymbolCompletionSpec(
      new ExprNode(),
      "a i",
      ParseStatus.incomplete,
      BinaryOperation.name,
      " i",
      [],
      ["is", "isnt"],
      "",
    );
  });
  test("Start of an expression", () => {
    testSymbolCompletionSpec(
      new ExprNode(),
      "n",
      ParseStatus.valid,
      ExprNode.name,
      "n",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_out,
        TokenType.id_parameter_regular,
        TokenType.id_property,
        TokenType.id_variable,
        TokenType.id_enumValue,
        TokenType.method_function,
        TokenType.method_system,
      ],
      ["new", "not"],
      "",
    );
  });
  test("Bracketed expression", () => {
    testSymbolCompletionSpec(
      new ExprNode(),
      "(",
      ParseStatus.incomplete,
      TermSimple.name,
      "",
      [
        TokenType.id_constant,
        TokenType.id_let,
        TokenType.id_parameter_out,
        TokenType.id_parameter_regular,
        TokenType.id_property,
        TokenType.id_variable,
        TokenType.id_enumValue,
        TokenType.method_function,
        TokenType.method_system,
      ],
      ["new,copy,if,lambda,empty,this,ref,not"],
      "",
    );
  });
});
