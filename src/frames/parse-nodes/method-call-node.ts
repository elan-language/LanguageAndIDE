import { TokenType } from "../symbol-completion-helpers";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { ArgListNode } from "./arg-list-node";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { IdentifierNode } from "./identifier-node";
import { PunctuationNode } from "./punctuation-node";

export class MethodCallNode extends AbstractSequence {
  name: IdentifierNode | undefined;
  args: CSV | undefined;

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.name = new IdentifierNode(
        new Set<TokenType>([TokenType.method_function, TokenType.method_system]),
      );
      this.addElement(this.name);
      this.addElement(new PunctuationNode(OPEN_BRACKET));
      this.addElement(new ArgListNode()); 
      this.addElement(new PunctuationNode(CLOSE_BRACKET));
      super.parseText(text);
    }
  }
  renderAsHtml(): string {
    return `<el-method>${this.name!.renderAsHtml()}</el-method>(${this.args!.renderAsHtml()})`;
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    if (this.getElements().length === 0) {
      return new Set<TokenType>([TokenType.method_function, TokenType.method_system]);
    } else {
      return super.symbolCompletion_tokenTypes();
    }
  }
}
