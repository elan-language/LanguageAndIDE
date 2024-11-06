import { AbstractAlternatives } from "./abstract-alternatives";
import { TypeGenericNode } from "./type-generic-node";
import { TypeSimpleNode } from "./type-simple-node";

export class TypeSimpleOrGeneric extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "<pr>Type</pr>";
  }
  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.alternatives.push(new TypeSimpleNode());
      this.alternatives.push(new TypeGenericNode());
      super.parseText(text);
    }
  }
}
