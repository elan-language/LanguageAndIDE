import { thisKeyword } from "../../../compiler/elan-keywords";
import { File } from "../frame-interfaces/file";
import { DOT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { InstanceNode } from "./instanceNode";
import { PunctuationNode } from "./punctuation-node";
import { ThisInstance } from "./this-instance";

export class PropertyRef extends AbstractSequence {
  name: InstanceNode;

  constructor(file: File) {
    super(file);
    this.addElement(new ThisInstance(this.file));
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
