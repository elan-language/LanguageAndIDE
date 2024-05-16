import { AbstractSequence } from "./abstract-sequence";
import { ExprNode } from "./expr-node";
import { CommaNode } from "./comma-node";

export class DoubleIndexNode extends AbstractSequence {
  indexOne: ExprNode | undefined;
  indexTwo: ExprNode | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      this.indexOne = new ExprNode();
      this.indexTwo = new ExprNode();

      this.addElement(this.indexOne);
      this.addElement(new CommaNode());
      this.addElement(this.indexTwo);
      return super.parseText(text);
    }
  }
}
