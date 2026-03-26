import { globalKeyword, libraryKeyword } from "../../../compiler/elan-keywords";
import { File } from "../frame-interfaces/file";
import { AbstractAlternatives } from "./abstract-alternatives";
import { KeywordNode } from "./keyword-node";

export class Namespace extends AbstractAlternatives {
  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = "";
  }

  parseText(text: string): void {
    if (text.trim().length > 0) {
      const glb = new KeywordNode(this.file, globalKeyword, false, true);
      const lib = new KeywordNode(this.file, libraryKeyword, false, true);
      this.alternatives.push(glb);
      this.alternatives.push(lib);
      super.parseText(text);
    }
  }
}
