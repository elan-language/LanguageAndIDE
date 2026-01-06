import { TokenType } from "../symbol-completion-helpers";
import { DOT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { PunctuationNode } from "./punctuation-node";
import { TypeNameNode } from "./type-name-node";

export class EnumVal extends AbstractSequence {
  type: TypeNameNode | undefined;
  val: IdentifierNode | undefined;

  parseText(text: string): void {
    this.type = new TypeNameNode(this.file, new Set([TokenType.type_enum]));
    this.addElement(this.type);
    this.addElement(new PunctuationNode(this.file, DOT));
    this.val = new IdentifierNode(
      this.file,
      new Set<TokenType>([TokenType.id_enumValue]),
      () => this.type!.matchedText,
    );
    this.addElement(this.val);
    super.parseText(text.trimStart());
  }
}
