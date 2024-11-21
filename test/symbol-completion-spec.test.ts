import { TokenType } from "../src/frames/helpers";
import { ExprNode } from "../src/frames/parse-nodes/expr-node";
import { IdentifierNode } from "../src/frames/parse-nodes/identifier-node";
import { MethodCallNode } from "../src/frames/parse-nodes/method-call-node";
import { ReferenceNode } from "../src/frames/parse-nodes/reference-node";
import { ParseStatus } from "../src/frames/status-enums";
import { ignore_test } from "./compiler/compiler-test-helpers";
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
  test("Expr1", () => {
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
      [], // Should be ["ref"]
    );
  });
  test("Expr1", () => {
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
        TokenType.id_enumValue, //should include method_function and method_system
        TokenType.method_function,
        TokenType.method_system,
      ],
      ["this"],
    );
    testSymbolCompletionSpec(new ExprNode(), "", ParseStatus.empty, ExprNode.name, "", [], []);
  });
  ignore_test("Expr1", () => {
    testSymbolCompletionSpec(
      new ReferenceNode(),
      "foo(",
      ParseStatus.incomplete,
      ExprNode.name,
      "foo(",
      [],
      ["this"],
    );
    testSymbolCompletionSpec(new ExprNode(), "", ParseStatus.empty, ExprNode.name, "", [], []);
  });
});
