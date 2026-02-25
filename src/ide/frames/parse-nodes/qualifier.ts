import { globalKeyword, libraryKeyword, propertyKeyword } from "../../../compiler/elan-keywords";
import { File } from "../frame-interfaces/file";
import { AbstractAlternatives } from "./abstract-alternatives";
import { KeywordNode } from "./keyword-node";

export class Qualifier extends AbstractAlternatives {
  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = this.getCompletionFromLangOr("");
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
}
