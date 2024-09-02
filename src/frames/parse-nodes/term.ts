import { AbstractAlternatives } from "./abstract-alternatives";
import { TermChained } from "./term-chained";
import { TermSimple } from "./term-simple";

export class Term extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "expression";
  }

  parseText(text: string): void {
    this.alternatives.push(new TermSimple());
    this.alternatives.push(new TermChained());
    super.parseText(text);
  }
}
