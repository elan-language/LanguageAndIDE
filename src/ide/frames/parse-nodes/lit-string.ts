import { File } from "../frame-interfaces/file";
import { AbstractAlternatives } from "./abstract-alternatives";
import { LitStringDoubleQuotesEmpty } from "./lit-string-double-quotes-empty";
import { LitStringDoubleQuotesNonEmpty } from "./lit-string-double-quotes-non-empty";

export class LitString extends AbstractAlternatives {
  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = this.getCompletionFromLangOr(`"string"`);
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.alternatives.push(new LitStringDoubleQuotesEmpty(this.file));
      this.alternatives.push(new LitStringDoubleQuotesNonEmpty(this.file));
      super.parseText(text);
    }
  }
}
