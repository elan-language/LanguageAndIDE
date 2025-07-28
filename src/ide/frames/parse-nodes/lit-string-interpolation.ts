import { OPEN_BRACE, CLOSE_BRACE } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { ExprNode } from "./expr-node";
import { PunctuationNode } from "./punctuation-node";

export class LitStringInterpolation extends AbstractSequence {
  expr: ExprNode | undefined;

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.addElement(new PunctuationNode(OPEN_BRACE));
      this.expr = new ExprNode();
      this.addElement(this.expr);
      this.addElement(new PunctuationNode(CLOSE_BRACE));
      super.parseText(text);
    }
  }
  renderAsHtml(): string {
    return `</el-lit>{${this.expr!.renderAsHtml()}}<el-lit>`; //Tags appear wrong way around - because field is breaking out of the string.
  }
}
