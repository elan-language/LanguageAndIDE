import { CSV } from "./csv";
import { ExprNode } from "./expr-node";

export class ArgListNode extends CSV {
  constructor() {
    super(() => new ExprNode(), 0);
    this.setSyntaxCompletionWhenEmpty("<i>arguments</i>");
  }
  override symbolCompletion_paramPromptsExpected(): boolean {
    return true;
  }
}
