import { AbstractSequence } from "./abstract-sequence";
import { SymbolNode } from "./symbol-node";
import { TypeNode } from "./type-node";
import { TypeSimpleNode } from "./type-simple-node";
import { CLOSE_SQ_BRACKET, OPEN_SQ_BRACKET } from "../symbols";

export class TypeListNode extends AbstractSequence {
  simpleType: TypeSimpleNode | undefined;
  generic: TypeNode | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = "Type";
  }
  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.simpleType = new TypeSimpleNode(); //Not added to elements, as not present in the text
      this.simpleType.parseText("ArrayList");
      this.addElement(new SymbolNode(OPEN_SQ_BRACKET));
      this.generic = new TypeNode();
      this.addElement(this.generic);
      this.addElement(new SymbolNode(CLOSE_SQ_BRACKET));
      super.parseText(text);
    }
  }
}
