import { CLOSE_BRACE, OPEN_BRACE } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { ExprNode2 } from "./expr-node2";
import { PunctuationNode } from "./punctuation-node";

export class StringInterpolation extends AbstractSequence {
  expr: ExprNode2 | undefined;

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.addElement(new PunctuationNode(OPEN_BRACE));
      this.expr = new ExprNode2();
      this.addElement(this.expr);
      this.addElement(new PunctuationNode(CLOSE_BRACE));
      super.parseText(text);
    }
  }
  renderAsHtml(): string {
    return `</string>{${this.expr!.renderAsHtml()}}<string>`; //Tags appear wrong way around - because field is breaking out of the string.
  }
}
