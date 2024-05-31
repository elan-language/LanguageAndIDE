
import { AbstractAlternatives } from "./abstract-alternatives";
import { TypeGeneric } from "./type-generic";
import { TypeSimpleNode } from "./type-simple-node";

export class TypeSimpleOrGeneric extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "Type";
  }
  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.alternatives.push(new TypeSimpleNode());
      this.alternatives.push(new TypeGeneric());
      super.parseText(text);
    }
  }
}
