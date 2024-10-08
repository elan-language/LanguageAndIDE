import { DOT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { PunctuationNode } from "./punctuation-node";
import { TypeSimpleNode } from "./type-simple-node";

export class EnumVal extends AbstractSequence {
  type: TypeSimpleNode | undefined;
  val: IdentifierNode | undefined;

  parseText(text: string): void {
    this.type = new TypeSimpleNode();
    this.addElement(this.type);
    this.addElement(new PunctuationNode(DOT));
    this.val = new IdentifierNode();
    this.addElement(this.val);
    super.parseText(text.trimStart());
  }
}
