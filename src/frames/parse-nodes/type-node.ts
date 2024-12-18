import { TokenType } from "../symbol-completion-helpers";
import {
  CLOSE_BRACE,
  CLOSE_SQ_BRACKET,
  OPEN_BRACE,
  OPEN_BRACKET,
  OPEN_SQ_BRACKET,
} from "../symbols";
import { AbstractAlternatives } from "./abstract-alternatives";
import { Alternatives } from "./alternatives";
import { TypeFuncNode } from "./type-func-node";
import { TypeGenericNode } from "./type-generic-node";
import { TypeInDelimiters } from "./type-in-delimiters";
import { TypeSimpleNode } from "./type-simple-node";
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
        this.alternatives.push(new TypeSimpleNode(this.tokenTypes));
        this.alternatives.push(new TypeGenericNode(this.tokenTypes));
      }
      super.parseText(text.trimStart());
    }
  }

  override symbolCompletion_tokenTypes(): Set<TokenType> {
    return this.tokenTypes;
  }
}
