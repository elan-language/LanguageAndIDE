
import { AbstractAlternatives } from "./abstract-alternatives";
import { TypeGeneric } from "./type-generic";
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
      this.alternatives.push(new TypeGeneric());
      super.parseText(text);
    }
  }
}
