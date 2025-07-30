import { AbstractAlternatives } from "./abstract-alternatives";
import { LitStringNonEmpty } from "./lit-string-non-empty";
import { LitStringEmpty } from "./lit-string-empty";

export class LitString extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = `"string"`;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.alternatives.push(new LitStringEmpty());
      this.alternatives.push(new LitStringNonEmpty());
      super.parseText(text);
    }
  }
}
