import { File } from "../frame-interfaces/file";
import { ParseNode } from "../frame-interfaces/parse-node";
import { ArgumentNode } from "./argument-node";
import { CSV } from "./csv";

export class ArgListNode extends CSV {
  context: () => string;

  constructor(file: File, context: () => string) {
    super(file, () => new ArgumentNode(file), 0);
    this.context = context;
  }

  override getActiveNode(): ParseNode {
    return this.matchedText.length === 0 ? this : super.getActiveNode();
  }
}
