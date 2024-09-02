import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { IdentifierNode } from "./identifier-node";
import { PunctuationNode } from "./punctuation-node";

export class MethodCallNode extends AbstractSequence {
  name: IdentifierNode | undefined;
  args: CSV | undefined;

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.name = new IdentifierNode();
      this.args = new CSV(() => new ExprNode(), 0);
      this.addElement(this.name);
      this.addElement(new PunctuationNode(OPEN_BRACKET));
      this.addElement(this.args); //arg list
      this.addElement(new PunctuationNode(CLOSE_BRACKET));
      super.parseText(text);
    }
  }
  renderAsHtml(): string {
    return `<method>${this.name!.renderAsHtml()}</method>(${this.args!.renderAsHtml()})`;
  }
}
