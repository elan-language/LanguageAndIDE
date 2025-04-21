import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { ParseNode } from "./parse-node";

export class ArgListNode extends CSV {
  nameForError(): string {
    return "as an argument list";
  }
  context: () => string;

  constructor(context: () => string) {
    super(() => new ExprNode(), 0);
    this.context = context;
  }

  override getActiveNode(): ParseNode {
    return this.matchedText.length === 0 ? this : super.getActiveNode();
  }
}
