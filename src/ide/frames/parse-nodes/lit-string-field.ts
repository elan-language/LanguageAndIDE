import { CLOSE_BRACE, OPEN_BRACE } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { ExprNode } from "./expr-node";
import { PunctuationNode } from "./punctuation-node";

export class LitStringField extends AbstractSequence {
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
    return this.delegateHtmlToLanguage();
  }
}
