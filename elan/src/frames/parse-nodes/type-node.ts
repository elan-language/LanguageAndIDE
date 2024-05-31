import { AbstractAlternatives } from "./abstract-alternatives";
import { TypeSimpleOrGeneric } from "./type-simple-or-generic";
import { TypeTuple } from "./type-tuple";
import { FuncTypeNode } from "./func-type-node";
import { OPEN_BRACE, OPEN_BRACKET, OPEN_SQ_BRACKET } from "../symbols";
import { TypeGenericNode } from "./type-generic-node";
import { TypeSimple } from "./type-simple";
import { TypeListNode } from "./type-list-node";
import { TypeImmutableListNode } from "./type-immutable-list-node";

export class TypeNode extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "Type";
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      if (text.trimStart().startsWith("Func")) { // tested first because 'Func' is *syntactically* valid simple type
        this.alternatives.push(new FuncTypeNode());
      } else if (text.trimStart().startsWith(OPEN_BRACKET)) {
        const tuple = new TypeTuple();
        this.alternatives.push(tuple);
      } else if (text.trimStart().startsWith(OPEN_SQ_BRACKET)) {
         const list = new TypeListNode();
        this.alternatives.push(list);
      } else if (text.trimStart().startsWith(OPEN_BRACE)) {
        const list = new TypeImmutableListNode();
       this.alternatives.push(list);
     }  else {
        this.alternatives.push(new TypeSimple());
        this.alternatives.push(new TypeGenericNode());
      }
      super.parseText(text.trimStart());
    }
  }
}
 