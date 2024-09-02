import { AbstractAlternatives } from "./abstract-alternatives";
import { BinaryExpression } from "./binary-expression";
import { CopyWith } from "./copy-with";
import { EmptyOfTypeNode } from "./empty-of-type-node";
import { IfExpr } from "./if-expr";
import { Lambda } from "./lambda";
import { NewInstance } from "./new-instance";
import { Term2 } from "./term2";

export class ExprNode2 extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "expression";
  }

  parseText(text: string): void {
    this.alternatives.push(new Term2());
    this.alternatives.push(new BinaryExpression());
    this.alternatives.push(new NewInstance());
    this.alternatives.push(new EmptyOfTypeNode());
    this.alternatives.push(new CopyWith());
    this.alternatives.push(new IfExpr());
    this.alternatives.push(new Lambda());
    //TODO FunctionRef to be added here
    super.parseText(text);
  }
}
