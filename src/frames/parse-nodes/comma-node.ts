import { COMMA } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { Space } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";
import { SpaceNode } from "./space-node";

export class CommaNode extends AbstractSequence {
  parseText(text: string): void {
    this.addElement(new PunctuationNode(COMMA));
    this.addElement(new SpaceNode(Space.added));
    super.parseText(text);
  }
}
