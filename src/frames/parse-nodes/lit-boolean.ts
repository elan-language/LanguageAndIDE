import { AbstractAlternatives } from "./abstract-alternatives";
import { KeywordNode } from "./keyword-node";

import { falseKeyword, trueKeyword } from "../keywords";

export class LitBoolean extends AbstractAlternatives {
  constructor() {
    super();
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.alternatives.push(new KeywordNode(trueKeyword));
      this.alternatives.push(new KeywordNode(falseKeyword));
      super.parseText(text.trimStart());
    }
  }
}
