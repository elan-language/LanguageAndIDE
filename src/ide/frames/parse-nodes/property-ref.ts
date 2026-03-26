import { thisKeyword } from "../../../compiler/elan-keywords";
import { File } from "../frame-interfaces/file";
import { DOT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { InstanceNode } from "./instanceNode";
import { KeywordNode } from "./keyword-node";
import { PunctuationNode } from "./punctuation-node";

export class PropertyRef extends AbstractSequence {
  kw: KeywordNode;
  name: InstanceNode;

  constructor(file: File) {
    super(file);
    const this_instance = this.file.language().THIS_INSTANCE;
    this.kw = new KeywordNode(file, this_instance);
    this.addElement(this.kw);
    this.addElement(new PunctuationNode(this.file, DOT));
    this.name = new InstanceNode(file);
    this.addElement(this.name);
  }

  renderAsHtml(): string {
    const this_instance = this.file.language().THIS_INSTANCE;
    return this.isValid()
      ? `<el-kw>${this_instance}</el-kw>.${this.name.renderAsHtml()}`
      : this.matchedText;
  }

  renderAsElanSource(): string {
    return `${thisKeyword}.${this.name.renderAsElanSource()}`;
  }
}
