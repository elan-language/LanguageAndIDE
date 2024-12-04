import { propertyKeyword } from "../keywords";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { DotAfter } from "./dot-after";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";

export class PropertyRef extends AbstractSequence {
  property: IdentifierNode;

  constructor() {
    super();
    this.addElement(new DotAfter(new KeywordNode(propertyKeyword)));
    this.property = new IdentifierNode(new Set([TokenType.id_property]));
    this.addElement(this.property);
  }
  compile(): string {
    return this.matchedText.toUpperCase();
  } //For the exponent e -> E
}
