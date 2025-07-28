import { TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { TypeGenericNode } from "./type-generic-node";
import { TypeNameNode } from "./type-name-node";

export class TypeSimpleOrGeneric extends AbstractAlternatives {
  tokenTypes: Set<TokenType> = new Set<TokenType>();

  constructor(tokenTypes: Set<TokenType> = new Set<TokenType>()) {
    super();
    this.completionWhenEmpty = "<i>Type</i>";
    this.tokenTypes = tokenTypes;
  }
  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.alternatives.push(new TypeNameNode(this.tokenTypes));
      this.alternatives.push(new TypeGenericNode(this.tokenTypes));
      super.parseText(text);
    }
  }

  override symbolCompletion_tokenTypes(): Set<TokenType> {
    return this.matchedText.length === 0 ? this.tokenTypes : super.symbolCompletion_tokenTypes();
  }

  override symbolCompletion_context(): string {
    return "none";
  }
}
