import { AbstractAlternatives } from "./abstract-alternatives";
import { BinaryExpression } from "./binary-expression";
import { CopyWith } from "./copy-with";
import { Term } from "./term";

export class ExprNode extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "expression";
  }

  parseText(text: string): void {
    this.alternatives.push(new Term());
    this.alternatives.push(new BinaryExpression());
    this.alternatives.push(new CopyWith());
    super.parseText(text);
  }
}
