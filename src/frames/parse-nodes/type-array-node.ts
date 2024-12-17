import { TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { TypeNode } from "./type-node";
import { TypeSimpleNode } from "./type-simple-node";

export class TypeArrayNode extends AbstractSequence {
  simpleType: TypeSimpleNode | undefined;
  generic: TypeNode | undefined;
  tokenTypes: Set<TokenType> = new Set<TokenType>();

  constructor(tokenTypes: Set<TokenType>) {
    super();
    this.tokenTypes = tokenTypes;
  }
  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.simpleType = new TypeSimpleNode(
        new Set<TokenType>([
          TokenType.type_abstract,
          TokenType.type_notInheritable,
          TokenType.type_concrete,
        ]),
      ); //Not added to elements, as not present in the text
      this.simpleType.parseText("Array");
      this.generic = new TypeNode(this.tokenTypes);
      this.addElement(this.generic);
      super.parseText(text);
    }
  }
  override symbolCompletion_tokenTypes(): Set<TokenType> {
    return this.matchedText.length === 0 ? this.tokenTypes : super.symbolCompletion_tokenTypes();
  }
}
