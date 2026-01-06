import { OPEN_BRACE, CLOSE_BRACE } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { ExprNode } from "./expr-node";
import { PunctuationNode } from "./punctuation-node";

export class LitStringInterpolation extends AbstractSequence {
  expr: ExprNode | undefined;

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.addElement(new PunctuationNode(this.file, OPEN_BRACE));
      this.expr = new ExprNode(this.file);
      this.addElement(this.expr);
      this.addElement(new PunctuationNode(this.file, CLOSE_BRACE));
      super.parseText(text);
    }
  }
  renderAsHtml(): string {
    return `</el-lit>{${this.expr!.renderAsHtml()}}<el-lit>`; //Tags appear wrong way around - because field is breaking out of the string.
  }
}
