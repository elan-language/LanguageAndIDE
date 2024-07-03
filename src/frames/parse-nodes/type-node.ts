import { AbstractAlternatives } from "./abstract-alternatives";
import { TypeSimpleOrGeneric } from "./type-simple-or-generic";
import { TypeTupleNode } from "./type-tuple-node";
import { FuncTypeNode } from "./func-type-node";
import { OPEN_BRACE, OPEN_BRACKET, OPEN_SQ_BRACKET } from "../symbols";
import { TypeGenericNode } from "./type-generic-node";
import { TypeSimpleNode } from "./type-simple-node";
import { TypeListNode } from "./type-list-node";
import { TypeImmutableListNode } from "./type-immutable-list-node";
import { TypeDictionaryNode } from "./type-dictionary-node";
import { TypeImmutableDictionaryNode } from "./type-immutable-dictionary-node";

export class TypeNode extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "Type";
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      if (text.trimStart().startsWith("Func")) {
        // tested first because 'Func' is *syntactically* valid simple type
        this.alternatives.push(new FuncTypeNode());
      } else if (text.trimStart().startsWith(OPEN_BRACKET)) {
        this.alternatives.push(new TypeTupleNode());
      } else if (text.trimStart().startsWith(OPEN_SQ_BRACKET)) {
        this.alternatives.push(new TypeListNode());
        this.alternatives.push(new TypeDictionaryNode());
      } else if (text.trimStart().startsWith(OPEN_BRACE)) {
        this.alternatives.push(new TypeImmutableListNode());
        this.alternatives.push(new TypeImmutableDictionaryNode());
      } else {
        this.alternatives.push(new TypeSimpleNode());
        this.alternatives.push(new TypeGenericNode());
      }
      super.parseText(text.trimStart());
    }
  }
}
