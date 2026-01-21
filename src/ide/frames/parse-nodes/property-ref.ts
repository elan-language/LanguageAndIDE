import { propertyKeyword } from "../../../compiler/keywords";
import { File } from "../frame-interfaces/file";
import { DOT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { InstanceNode } from "./instanceNode";
import { KeywordNode } from "./keyword-node";
import { PunctuationNode } from "./punctuation-node";

export class PropertyRef extends AbstractSequence {
  qualifier: KeywordNode;
  name: InstanceNode;

  constructor(file: File) {
    super(file);
    this.qualifier = new KeywordNode(file, propertyKeyword);
    this.addElement(this.qualifier);
    this.addElement(new PunctuationNode(this.file, DOT));
    this.name = new InstanceNode(file);
    this.addElement(this.name);
  }

  override renderAsHtml(): string {
    return `<el-kw>self</el-kw>.${this.name.renderAsHtml()}`;
  }
}
