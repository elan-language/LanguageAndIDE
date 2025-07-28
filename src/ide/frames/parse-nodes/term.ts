import { refKeyword, thisKeyword } from "../../../compiler/keywords";
import { ParseNode } from "../frame-interfaces/parse-node";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { allIdsAndMethods } from "./parse-node-helpers";
import { TermChained } from "./term-chained";
import { TermSimpleWithOptIndex } from "./term-simple-with-opt-index";

export class Term extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "<i>expression</i>";
  }

  parseText(text: string): void {
    this.alternatives.push(new TermSimpleWithOptIndex());
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

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    if (this.alternatives.length === 0) {
      return new Set<KeywordCompletion>([
        KeywordCompletion.create(thisKeyword),
        KeywordCompletion.create(refKeyword),
      ]);
    } else {
      return super.symbolCompletion_keywords();
    }
  }

  override getActiveNode(): ParseNode {
    const best = this.bestMatch;
    if (best) {
      return best!.getActiveNode(); //Because any symbol completion is valid for TermChained also
    } else {
      return this as ParseNode;
    }
  }
}
