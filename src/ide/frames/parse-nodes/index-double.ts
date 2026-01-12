import { AbstractSequence } from "./abstract-sequence";
import { CommaNode } from "./comma-node";
import { ExprNode } from "./expr-node";

export class IndexDouble extends AbstractSequence {
  index1: ExprNode | undefined;
  index2: ExprNode | undefined;

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.index1 = new ExprNode(this.file);
      this.index2 = new ExprNode(this.file);
      this.addElement(this.index1);
      this.addElement(new CommaNode(this.file));
      this.addElement(this.index2);
      super.parseText(text);
    }
  }

  override renderAsHtml(): string {
    const fromLanguage = this.file.language().renderNodeAsHtml(this);
    return fromLanguage.length > 0 ? fromLanguage : super.renderAsHtml();
  }
}
