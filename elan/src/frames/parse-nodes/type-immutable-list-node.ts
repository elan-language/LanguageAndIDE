import { AbstractSequence } from "./abstract-sequence";
import { SymbolNode } from "./symbol-node";
import { TypeNode } from "./type-node";
import { TypeSimple } from "./type-simple";
import { CLOSE_BRACE, OPEN_BRACE } from "../symbols";

export class TypeImmutableListNode extends AbstractSequence {
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
      this.simpleType.parseText("ImmutableList");
      this.addElement(new SymbolNode(OPEN_BRACE));
      this.generic = new TypeNode();
      this.addElement(this.generic);
      this.addElement(new SymbolNode(CLOSE_BRACE));
      super.parseText(text);
    }
  }
}
