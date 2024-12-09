import { TokenType } from "../symbol-completion-helpers";
import { DOT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { PunctuationNode } from "./punctuation-node";
import { TypeSimpleNode } from "./type-simple-node";

export class EnumVal extends AbstractSequence {
  type: TypeSimpleNode | undefined;
  val: IdentifierNode | undefined;

  parseText(text: string): void {
    this.type = new TypeSimpleNode(new Set([TokenType.type_enum]));
    this.addElement(this.type);
    this.addElement(new PunctuationNode(DOT));
    this.val = new IdentifierNode(
      new Set<TokenType>([TokenType.id_enumValue]),
      () => this.type!.matchedText,
    );
    this.addElement(this.val);
    super.parseText(text.trimStart());
  }
}
