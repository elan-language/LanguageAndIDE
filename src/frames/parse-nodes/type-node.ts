import { TokenType } from "../symbol-completion-helpers";
import { OPEN_BRACKET } from "../symbols";
import { AbstractAlternatives } from "./abstract-alternatives";
import { TypeFuncNode } from "./type-func-node";
import { TypeGenericNode } from "./type-generic-node";
import { TypeNameNode } from "./type-name-node";
import { TypeTupleNode } from "./type-tuple-node";

export class TypeNode extends AbstractAlternatives {
  tokenTypes: Set<TokenType> = new Set<TokenType>();

  constructor(tokenTypes: Set<TokenType> = new Set<TokenType>()) {
    super();
    this.completionWhenEmpty = "<i>Type</i>";
    this.tokenTypes = tokenTypes;
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      if (text.trimStart().startsWith("Func")) {
        // tested first because 'Func' is *syntactically* valid simple type
        this.alternatives.push(new TypeFuncNode());
      } else if (text.trimStart().startsWith(OPEN_BRACKET)) {
        this.alternatives.push(new TypeTupleNode());
      } else {
        this.alternatives.push(new TypeNameNode(this.tokenTypes));
        this.alternatives.push(new TypeGenericNode(this.tokenTypes));
      }
      super.parseText(text.trimStart());
    }
  }

  override symbolCompletion_tokenTypes(): Set<TokenType> {
    return this.matchedText.length === 0 ? this.tokenTypes : super.symbolCompletion_tokenTypes();
  }
}
