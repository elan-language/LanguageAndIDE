import { TokenType } from "../src/frames/helpers";
import { ExprNode } from "../src/frames/parse-nodes/expr-node";
import { ReferenceNode } from "../src/frames/parse-nodes/reference-node";
import { Term } from "../src/frames/parse-nodes/term";
import { ParseStatus } from "../src/frames/status-enums";
import { testSymbolCompletionSpec } from "./testHelpers";

suite("Symbol Completion", () => {
  test("Expr1", () => {
    testSymbolCompletionSpec(
      new ReferenceNode(),
      "t",
      ParseStatus.valid,
      ReferenceNode.name,
      "t",
      [TokenType.id_let], //Not correct!
      [],
    );
    testSymbolCompletionSpec(new ExprNode(), "", ParseStatus.empty, ExprNode.name, "", [], []);
  });
});
