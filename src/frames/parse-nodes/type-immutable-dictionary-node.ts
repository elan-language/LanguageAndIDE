import { CLOSE_BRACE, COLON, OPEN_BRACE } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { PunctuationNode } from "./punctuation-node";
import { TypeNode } from "./type-node";
import { TypeSimpleNode } from "./type-simple-node";

export class TypeImmutableDictionaryNode extends AbstractSequence {
  simpleType: TypeSimpleNode | undefined;
  keyType: TypeNode | undefined;
  valueType: TypeNode | undefined;

  constructor() {
    super();
  }
  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.simpleType = new TypeSimpleNode(); //Not added to elements, as not present in the text
      this.simpleType.parseText("ImmutableDictionary");
      this.addElement(new PunctuationNode(OPEN_BRACE));
      this.keyType = new TypeNode();
      this.addElement(this.keyType);
      this.addElement(new PunctuationNode(COLON));
      this.valueType = new TypeNode();
      this.addElement(this.valueType);
      this.addElement(new PunctuationNode(CLOSE_BRACE));
      super.parseText(text);
    }
  }
}
