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
import { PunctuationNode } from "./punctuation-node";
import { Sequence } from "./sequence";
import { TypeArrayNode } from "./type-array-node";
import { TypeDictionaryNode } from "./type-dictionary-node";
import { TypeFuncNode } from "./type-func-node";
import { TypeGenericNode } from "./type-generic-node";
import { TypeImmutableDictionaryNode } from "./type-immutable-dictionary-node";
import { TypeImmutableListNode } from "./type-immutable-list-node";
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
      } else if (text.trimStart().startsWith(OPEN_SQ_BRACKET)) {
        const array = () => new TypeArrayNode(this.tokenTypes);
        const dict = () => new TypeDictionaryNode(this.tokenTypes);
        const arrayOrDict = new Alternatives([array, dict]);
        const typeInSqBrackets = new TypeInDelimiters(
          OPEN_SQ_BRACKET,
          arrayOrDict,
          CLOSE_SQ_BRACKET,
          this.tokenTypes,
        );
        this.alternatives.push(typeInSqBrackets);
      } else if (text.trimStart().startsWith(OPEN_BRACE)) {
        const list = () => new TypeImmutableListNode(this.tokenTypes);
        const immDict = () => new TypeImmutableDictionaryNode(this.tokenTypes);
        const listOrImmDict = new Alternatives([list, immDict]);
        const typeInBraces = new TypeInDelimiters(
          OPEN_BRACE,
          listOrImmDict,
          CLOSE_BRACE,
          this.tokenTypes,
        );
        this.alternatives.push(typeInBraces);
      } else {
        this.alternatives.push(new TypeSimpleNode(this.tokenTypes));
        this.alternatives.push(new TypeGenericNode(this.tokenTypes));
      }
      super.parseText(text.trimStart());
    }
  }
}
