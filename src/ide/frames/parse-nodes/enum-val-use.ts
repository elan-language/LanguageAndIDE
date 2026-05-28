import { TokenType } from "../symbol-completion-helpers";
import { DOT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierUse } from "./identifier-use";
import { PunctuationNode } from "./punctuation-node";
import { TypeNameUse } from "./type-name-use";

export class EnumValUse extends AbstractSequence {
  type: TypeNameUse | undefined;
  val: IdentifierUse | undefined;

  parseText(text: string): void {
    this.type = new TypeNameUse(this.file, new Set([TokenType.type_enum]));
    this.addElement(this.type);
    this.addElement(new PunctuationNode(this.file, DOT));
    this.val = new IdentifierUse(
      this.file,
      new Set<TokenType>([TokenType.id_enumValue]),
      () => this.type!.matchedText,
    );
    this.addElement(this.val);
    super.parseText(text.trimStart());
  }
}
