import { typeofKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { TermSimple } from "./term-simple";

export class TypeOfNode extends AbstractSequence {
  argument: TermSimple | undefined;

  parseText(text: string): void {
    this.addElement(new KeywordNode(typeofKeyword));
    this.addElement(new SpaceNode(Space.required));
    this.argument = new TermSimple();
    this.addElement(this.argument);
    super.parseText(text);
  }

  symbolCompletion_keywords(): Set<string> {
    return this.getElements().length === 0
      ? new Set<string>([typeofKeyword])
      : super.symbolCompletion_keywords();
  }
}
