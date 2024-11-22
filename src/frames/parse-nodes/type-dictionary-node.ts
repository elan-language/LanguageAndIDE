import { TokenType } from "../symbol-completion-helpers";
import { CLOSE_SQ_BRACKET, COLON, OPEN_SQ_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { PunctuationNode } from "./punctuation-node";
import { TypeNode } from "./type-node";
import { TypeSimpleNode } from "./type-simple-node";

export class TypeDictionaryNode extends AbstractSequence {
  simpleType: TypeSimpleNode | undefined;
  keyType: TypeNode | undefined;
  valueType: TypeNode | undefined;
  tokenTypes: Set<TokenType> = new Set<TokenType>();

  constructor(tokenTypes: Set<TokenType>) {
    super();
    this.tokenTypes = tokenTypes;
  }
  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.simpleType = new TypeSimpleNode(
        new Set<TokenType>([TokenType.type_abstract, TokenType.type_concrete]),
      ); //Not added to elements, as not present in the text
      this.simpleType.parseText("Dictionary");
      this.addElement(new PunctuationNode(OPEN_SQ_BRACKET));
      this.keyType = new TypeNode(this.tokenTypes);
      this.addElement(this.keyType);
      this.addElement(new PunctuationNode(COLON));
      this.valueType = new TypeNode(this.tokenTypes);
      this.addElement(this.valueType);
      this.addElement(new PunctuationNode(CLOSE_SQ_BRACKET));
      super.parseText(text);
    }
  }
}
