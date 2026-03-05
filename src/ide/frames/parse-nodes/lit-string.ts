import { File } from "../frame-interfaces/file";
import { AbstractAlternatives } from "./abstract-alternatives";
import { LitStringInterpolated } from "./lit-string-interpolated";
import { LitStringInterpolatedEmpty } from "./lit-string-interpolated-empty";
import { LitStringOrdinary } from "./lit-string-ordinary";

export class LitString extends AbstractAlternatives {
  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = this.getCompletionFromLangOr(`"string"`);
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.alternatives.push(new LitStringOrdinary(this.file));
      this.alternatives.push(new LitStringInterpolatedEmpty(this.file));
      this.alternatives.push(new LitStringInterpolated(this.file));
      super.parseText(text);
    }
  }
}
