import { AbstractAlternatives } from "./abstract-alternatives";
import { LitStringDoubleQuotesEmpty } from "./lit-string-double-quotes-empty";
import { LitStringDoubleQuotesNonEmpty } from "./lit-string-double-quotes-non-empty";
import { LitStringSingleQuotes } from "./lit-string-single-quotes";

export class LitString extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = `"string"`;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.alternatives.push(new LitStringSingleQuotes());
      this.alternatives.push(new LitStringDoubleQuotesEmpty());
      this.alternatives.push(new LitStringDoubleQuotesNonEmpty());
      super.parseText(text);
    }
  }
}
