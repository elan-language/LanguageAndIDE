
import { AbstractAlternatives } from "./abstract-alternatives";
import { TypeGenericNode } from "./type-generic-node";
import { TypeSimple } from "./type-simple";

export class TypeSimpleOrGeneric extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "Type";
  }
  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.alternatives.push(new TypeSimple());
      this.alternatives.push(new TypeGenericNode());
      super.parseText(text);
    }
  }
}
