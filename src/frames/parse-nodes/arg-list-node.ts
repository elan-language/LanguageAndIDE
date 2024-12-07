import { CSV } from "./csv";
import { ExprNode } from "./expr-node";

export class ArgListNode extends CSV {
  method: () => string;
  constructor(method: () => string) {
    super(() => new ExprNode(), 0);
    this.method = method;
    this.setSyntaxCompletionWhenEmpty("<i>arguments</i>");
  }
}
