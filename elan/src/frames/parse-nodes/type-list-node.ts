import { AbstractSequence } from "./abstract-sequence";
import { SymbolNode } from "./symbol-node";
import { TypeNode } from "./type-node";
import { TypeSimple } from "./type-simple";
import { CLOSE_SQ_BRACKET, OPEN_SQ_BRACKET } from "../symbols";

export class TypeListNode extends AbstractSequence {
  simpleType: TypeSimple | undefined;
  generic: TypeNode | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = "Type";
  }
  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.simpleType = new TypeSimple(); //Not added to elements, as not present in the text
      this.simpleType.parseText("List");
      this.addElement(new SymbolNode(OPEN_SQ_BRACKET));
      this.addElement(new TypeNode());
      this.addElement(new SymbolNode(CLOSE_SQ_BRACKET));
      super.parseText(text);
    }
  }
}
