import { COMMA } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { SymbolNode } from "./symbol-node";

export class CommaNode extends AbstractSequence {
  parseText(text: string): void {
    this.addElement(new SymbolNode(COMMA));
    this.addElement(new SpaceNode(Space.added));
    super.parseText(text);
  }
}
