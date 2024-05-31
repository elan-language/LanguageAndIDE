import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { SymbolNode } from "./symbol-node";
import { TypeSimple } from "./type-simple";
import { DOT } from "../symbols";

export class EnumVal extends AbstractSequence {
  type: TypeSimple | undefined;
  val: IdentifierNode | undefined;

  parseText(text: string): void {
    this.type = new TypeSimple();
    this.addElement(this.type);
    this.addElement(new SymbolNode(DOT));
    this.val = new IdentifierNode();
    this.addElement(this.val);
    super.parseText(text.trimStart());
  }
}
