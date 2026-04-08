import { File } from "../frame-interfaces/file";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { allIdsAndMethods, allKeywordsThatCanStartAnExpression } from "./parse-node-helpers";
import { TermSimple } from "./term-simple";
import { TermSimpleWithOptIndex } from "./term-simple-with-opt-index";

export class RaiseToPower extends AbstractSequence {
  base: TermSimpleWithOptIndex | undefined;
  exponent: TermSimple | undefined;

  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = "<i>expression</i>";
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.file.language().addNodesForRaiseToPower(this);
      super.parseText(text);
    }
  }

  renderAsHtml(): string {
    return this.isValid() ? this.file.language().raiseToPowerAsHtml(this) : this.matchedText;
  }

  renderAsElanSource(): string {
    return `pow(${this.base?.renderAsElanSource()}, ${this.exponent?.renderAsElanSource()})`;
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    if (this.getElements().length === 0) {
      return new Set<TokenType>(allIdsAndMethods);
    } else {
      return super.symbolCompletion_tokenTypes();
    }
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.getElements().length === 0
      ? allKeywordsThatCanStartAnExpression
      : super.symbolCompletion_keywords();
  }
}
