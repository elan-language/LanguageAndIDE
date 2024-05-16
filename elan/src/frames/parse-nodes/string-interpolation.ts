import { AbstractSequence } from "./abstract-sequence";
import { ExprNode } from "./expr-node";
import { SymbolNode } from "./symbol-node";
import { CLOSE_BRACE, OPEN_BRACE } from "../symbols";

export class StringInterpolation extends AbstractSequence {
  expr: ExprNode | undefined;

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.addElement(new SymbolNode(OPEN_BRACE));
      this.expr = new ExprNode();
      this.addElement(this.expr);
      this.addElement(new SymbolNode(CLOSE_BRACE));
      super.parseText(text);
    }
  }
  renderAsHtml(): string {
    return `</string>{${this.expr!.renderAsHtml()}}<string>`; //Tags appear wrong way around - because field is breaking out of the string.
  }
}
