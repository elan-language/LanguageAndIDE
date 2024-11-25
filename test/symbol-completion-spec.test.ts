import { Alternatives } from "../src/frames/parse-nodes/alternatives";
import { ExprNode } from "../src/frames/parse-nodes/expr-node";
import { IdentifierNode } from "../src/frames/parse-nodes/identifier-node";
import { KeywordNode } from "../src/frames/parse-nodes/keyword-node";
import { LitValueNode } from "../src/frames/parse-nodes/lit-value";
import { MethodCallNode } from "../src/frames/parse-nodes/method-call-node";
import { ReferenceNode } from "../src/frames/parse-nodes/reference-node";
import { TermSimple } from "../src/frames/parse-nodes/term-simple";
import { TypeSimpleNode } from "../src/frames/parse-nodes/type-simple-node";
import { ParseStatus } from "../src/frames/status-enums";
import { TokenType } from "../src/frames/symbol-completion-helpers";
import { testSymbolCompletionSpec } from "./testHelpers";

suite("Symbol Completion", () => {
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
      ExprNode.name, //because t could be start of literal boolean, or typeof  also
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
      ExprNode.name, //because t could be start of literal boolean, or typeof  also
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
      Alternatives.name, //coming back as Alternatives
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
      ["new,copy,if,lambda,empty,this,ref"], // Not showing 'this,ref' - which should be coming from Term
    );
  });
  test("Expression3", () => {
    testSymbolCompletionSpec(
      new ExprNode(),
      "Foo",
      ParseStatus.incomplete,
      ExprNode.name, //Because can be a term, or a binary expression
      "Foo",
      [TokenType.type_enum],
      [],
    );
  });
});
