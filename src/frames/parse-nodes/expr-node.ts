import { AbstractAlternatives } from "./abstract-alternatives";
import { BinaryExpression } from "./binary-expression";
import { CopyExpr } from "./copy-expr";
import { Term } from "./term";

export class ExprNode extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "expression";
  }

  parseText(text: string): void {
    this.alternatives.push(new Term());
    this.alternatives.push(new BinaryExpression());
    this.alternatives.push(new CopyExpr());
    super.parseText(text);
  }
}
