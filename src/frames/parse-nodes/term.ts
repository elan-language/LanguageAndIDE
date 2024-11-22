import { functionKeyword, newKeyword, refKeyword, thisKeyword } from "../keywords";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { allIdsAndMethods } from "./parse-node-helpers";
import { TermChained } from "./term-chained";
import { TermSimple } from "./term-simple";

export class Term extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "<i>expression</i>";
  }

  parseText(text: string): void {
    this.alternatives.push(new TermSimple());
    this.alternatives.push(new TermChained());
    super.parseText(text);
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    if (this.alternatives.length === 0) {
      return new Set<TokenType>(allIdsAndMethods);
    } else {
      return super.symbolCompletion_tokenTypes();
    }
  }

  symbolCompletion_keywords(): Set<string> {
    if (this.alternatives.length === 0) {
      return new Set<string>([thisKeyword, refKeyword]);
    } else {
      return super.symbolCompletion_keywords();
    }
  }
}
