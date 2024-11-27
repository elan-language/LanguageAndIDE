import { TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { ParseNode } from "./parse-node";

export class Alternatives extends AbstractAlternatives {
  elementConstructors: (() => ParseNode)[];
  tokenTypes: Set<TokenType>;

  constructor(elementConstructors: (() => ParseNode)[], tokenTypes = new Set<TokenType>()) {
    super();
    this.elementConstructors = elementConstructors;
    this.tokenTypes = tokenTypes;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.elementConstructors.forEach((ec) => {
        this.alternatives.push(ec());
      });
    }
    super.parseText(text);
  }

  override symbolCompletion_tokenTypes(): Set<TokenType> {
    return this.matchedText.length === 0 && this.tokenTypes.values.length > 0 ? 
    this.tokenTypes 
    : super.symbolCompletion_tokenTypes();
  } 
}
