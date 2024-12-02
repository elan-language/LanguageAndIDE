import { TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { conreteAndAbstractTypes } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";

export class TypeInDelimiters extends AbstractSequence {
  alternatives: Alternatives;
  tokenTypes: Set<TokenType> = new Set<TokenType>();
  openSymbol: string;
  closeSymbol: string;

  constructor(
    openSymbol: string,
    alternatives: Alternatives,
    closeSymbol: string,
    tokenTypes: Set<TokenType>,
  ) {
    super();
    this.openSymbol = openSymbol;
    this.alternatives = alternatives;
    this.closeSymbol = closeSymbol;
    this.tokenTypes = tokenTypes;
    this.alternatives.completionWhenEmpty = "<i>Type</i>";
  }
  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.addElement(new PunctuationNode(this.openSymbol));
      this.addElement(this.alternatives);
      this.addElement(new PunctuationNode(this.closeSymbol));
      super.parseText(text);
    }
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    if (this.getElements().length === 0) {
      return new Set<TokenType>(conreteAndAbstractTypes);
    } else {
      return super.symbolCompletion_tokenTypes();
    }
  }
}
