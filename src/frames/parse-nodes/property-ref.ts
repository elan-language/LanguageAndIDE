import { propertyKeyword } from "../keywords";
import { TokenType } from "../symbol-completion-helpers";
import { DOT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { PunctuationNode } from "./punctuation-node";

export class PropertyRef extends AbstractSequence {
  qualifier: KeywordNode;
  name: IdentifierNode;

  constructor() {
    super();
    this.qualifier = new KeywordNode(propertyKeyword);
    this.addElement(this.qualifier);
    this.addElement(new PunctuationNode(DOT));
    this.name = new IdentifierNode(new Set([TokenType.id_property]));
    this.addElement(this.name);
  }
}
