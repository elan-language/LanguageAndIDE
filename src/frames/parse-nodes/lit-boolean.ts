import { AbstractAlternatives } from "./abstract-alternatives";
import { KeywordNode } from "./keyword-node";

import { falseKeyword, trueKeyword } from "../keywords";
import { KeywordCompletion } from "../symbol-completion-helpers";

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

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    let set = new Set<KeywordCompletion>();
    if (trueKeyword.startsWith(this.matchedText)) {
      set = set.add(KeywordCompletion.create(trueKeyword, false));
    }
    if (falseKeyword.startsWith(this.matchedText)) {
      set = set.add(KeywordCompletion.create(falseKeyword, false));
    }
    return set;
  }
}
