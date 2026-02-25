import { File } from "../frame-interfaces/file";
import { DOT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierUse } from "./identifier-use";
import { InstanceNode } from "./instanceNode";
import { PunctuationNode } from "./punctuation-node";

export class PropertyInstanceRef extends AbstractSequence {
  qualifier: IdentifierUse;
  name: InstanceNode;

  constructor(file: File) {
    super(file);
    this.qualifier = new IdentifierUse(file);
    this.addElement(this.qualifier);
    this.addElement(new PunctuationNode(this.file, DOT));
    this.name = new InstanceNode(file);
    this.addElement(this.name);
  }

  override renderAsHtml(): string {
    return `${this.qualifier.renderAsHtml()}.${this.name.renderAsHtml()}`;
  }
}
