import { DOUBLE_DOT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { ExprNode } from "./expr-node";
import { OptionalNode } from "./optional-node";
import { PunctuationNode } from "./punctuation-node";

export class IndexRange extends AbstractSequence {
  fromIndex: OptionalNode | undefined;
  toIndex: OptionalNode | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      this.fromIndex = new OptionalNode(new ExprNode());
      this.toIndex = new OptionalNode(new ExprNode());

      this.addElement(this.fromIndex);
      this.addElement(new PunctuationNode(DOUBLE_DOT));
      this.addElement(this.toIndex);
      return super.parseText(text);
    }
  }
}
