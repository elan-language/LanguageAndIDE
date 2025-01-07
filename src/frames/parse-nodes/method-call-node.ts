import { TokenType } from "../symbol-completion-helpers";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { ArgListNode } from "./arg-list-node";
import { MethodNameMode } from "./method-name-node";
import { PunctuationNode } from "./punctuation-node";

export class MethodCallNode extends AbstractSequence {
  name: MethodNameMode | undefined;
  args: ArgListNode | undefined;
  tokenTypes: Set<TokenType>;

  constructor(
    tokenTypes: Set<TokenType> = new Set<TokenType>([
      TokenType.method_function,
      TokenType.method_system,
    ]),
  ) {
    super();
    this.tokenTypes = tokenTypes;
  }

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.name = new MethodNameMode(this.tokenTypes);
      this.addElement(this.name);
      this.addElement(new PunctuationNode(OPEN_BRACKET));
      this.args = new ArgListNode(() => this.name!.matchedText);
      this.addElement(this.args);
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
