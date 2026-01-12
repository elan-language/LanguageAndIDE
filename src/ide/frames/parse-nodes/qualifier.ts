import { globalKeyword, libraryKeyword, propertyKeyword } from "../../../compiler/keywords";
import { AbstractAlternatives } from "./abstract-alternatives";
import { KeywordNode } from "./keyword-node";
import { File } from "../frame-interfaces/file";

export class Qualifier extends AbstractAlternatives {
  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = "";
  }

  parseText(text: string): void {
    if (text.trim().length > 0) {
      const glb = new KeywordNode(this.file, globalKeyword, false, true);
      const lib = new KeywordNode(this.file, libraryKeyword, false, true);
      const prop = new KeywordNode(this.file, propertyKeyword, false, true);
      this.alternatives.push(glb);
      this.alternatives.push(lib);
      this.alternatives.push(prop);
      super.parseText(text);
    }
  }

  override renderAsHtml(): string {
    return this.matchedText.startsWith(propertyKeyword)
      ? `<el-kw>self</el-kw>`
      : super.renderAsHtml();
  }
}
