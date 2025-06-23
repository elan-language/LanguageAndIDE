import { ParseNode } from "../frame-interfaces/parse-node";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";

export class ArgListNode extends CSV {
  context: () => string;

  constructor(context: () => string) {
    super(() => new ExprNode(), 0);
    this.context = context;
  }

  override getActiveNode(): ParseNode {
    return this.matchedText.length === 0 ? this : super.getActiveNode();
  }
}
