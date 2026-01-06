import { ParseNode } from "../frame-interfaces/parse-node";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { File } from "../frame-interfaces/file";

export class ArgListNode extends CSV {
  context: () => string;

  constructor(file: File, context: () => string) {
    super(file, () => new ExprNode(file), 0);
    this.context = context;
  }

  override getActiveNode(): ParseNode {
    return this.matchedText.length === 0 ? this : super.getActiveNode();
  }
}
