import { propertyKeyword } from "../../../compiler/keywords";
import { TokenType } from "../symbol-completion-helpers";
import { DOT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { PunctuationNode } from "./punctuation-node";
import { File } from "../frame-interfaces/file";

export class PropertyRef extends AbstractSequence {
  qualifier: KeywordNode;
  name: IdentifierNode;

  constructor(file: File) {
    super(file);
    this.qualifier = new KeywordNode(file, propertyKeyword);
    this.addElement(this.qualifier);
    this.addElement(new PunctuationNode(this.file, DOT));
    this.name = new IdentifierNode(file, new Set([TokenType.id_property]));
    this.addElement(this.name);
  }

  override renderAsHtml(): string {
    return `<el-kw>self</el-kw>.${this.name.renderAsHtml()}`;
  }
}
