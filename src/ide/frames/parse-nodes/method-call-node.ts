import { TokenType } from "../symbol-completion-helpers";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { ArgListNode } from "./arg-list-node";
import { MethodNameNode } from "./method-name-node";
import { Space } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";
import { SpaceNode } from "./space-node";
import { File } from "../frame-interfaces/file";

export class MethodCallNode extends AbstractSequence {
  name: MethodNameNode | undefined;
  args: ArgListNode | undefined;
  tokenTypes: Set<TokenType>;

  constructor(
    file: File,
    tokenTypes: Set<TokenType> = new Set<TokenType>([
      TokenType.method_function,
      TokenType.method_system,
    ]),
  ) {
    super(file);
    this.tokenTypes = tokenTypes;
  }

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.name = new MethodNameNode(this.file, this.tokenTypes);
      this.addElement(this.name);
      this.addElement(new PunctuationNode(this.file, OPEN_BRACKET));
      this.addElement(new SpaceNode(this.file, Space.ignored));
      this.args = new ArgListNode(this.file, () => this.name!.matchedText);
      this.addElement(this.args);
      this.addElement(new SpaceNode(this.file, Space.ignored));
      this.addElement(new PunctuationNode(this.file, CLOSE_BRACKET));
      super.parseText(text);
    }
  }
  renderAsHtml(): string {
    return `${this.name!.renderAsHtml()}(${this.args!.renderAsHtml()})`;
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    if (this.getElements().length === 0) {
      return new Set<TokenType>([TokenType.method_function, TokenType.method_system]);
    } else {
      return super.symbolCompletion_tokenTypes();
    }
  }
}
