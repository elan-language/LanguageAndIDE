import { AbstractAlternatives } from "./abstract-alternatives";
import { TypeWithOptGenerics } from "./type-with-opt-generics";
import { TypeTuple } from "./type-tuple";
import { FuncTypeNode } from "./func-type-node";
import { OPEN_BRACKET, OPEN_SQ_BRACKET } from "../symbols";
import { TypeGeneric } from "./type-generic";
import { TypeSimpleNode } from "./type-simple-node";

export class TypeNode extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "Type";
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      // Func - tested first because 'Func' is syntactically valid as a simple type name
      if (text.trimStart().startsWith("Func")) {
        this.alternatives.push(new FuncTypeNode());
      } else if (text.trimStart().startsWith(OPEN_BRACKET)) {
        const tuple = new TypeTuple();
        this.alternatives.push(tuple);
      } else {
        this.alternatives.push(new TypeSimpleNode());
        this.alternatives.push(new TypeGeneric());
      }
      super.parseText(text.trimStart());
    }
  }
}
 