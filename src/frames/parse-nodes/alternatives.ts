import { TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { ParseNode } from "./parse-node";

export class Alternatives extends AbstractAlternatives {
  elementConstructors: (() => ParseNode)[];
  tokenTypes: Set<TokenType>;
  context: () => string;

  constructor(elementConstructors: (() => ParseNode)[], tokenTypes = new Set<TokenType>(), context = () => "") {
    super();
    this.elementConstructors = elementConstructors;
    this.tokenTypes = tokenTypes;
    this.context = context;
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
    return this.matchedText.length === 0 && this.tokenTypes.size > 0 ? 
    this.tokenTypes 
    : super.symbolCompletion_tokenTypes();
  } 

  override symbolCompletion_constraintId(): string {
    return this.matchedText.length === 0 ? this.context() : super.symbolCompletion_constraintId();
  }
}
