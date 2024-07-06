import { andKeyword, isKeyword, isntKeyword, orKeyword } from "../keywords";
import { DIVIDE, GE, GT, LE, LT, MINUS, MULT, PLUS, POWER } from "../symbols";
import { AbstractAlternatives } from "./abstract-alternatives";
import { KeywordNode } from "./keyword-node";
import { OperatorNode } from "./operator-node";

export class BinaryOperation extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "operator ";
  }
  parseText(text: string): void {
    this.alternatives.push(new OperatorNode(PLUS));
    this.alternatives.push(new OperatorNode(MINUS));
    this.alternatives.push(new OperatorNode(MULT));
    this.alternatives.push(new OperatorNode(DIVIDE));
    this.alternatives.push(new OperatorNode(GT));
    this.alternatives.push(new OperatorNode(LT));
    this.alternatives.push(new OperatorNode(GE));
    this.alternatives.push(new OperatorNode(LE));
    this.alternatives.push(new OperatorNode(POWER));
    this.alternatives.push(new KeywordNode(isKeyword));
    this.alternatives.push(new KeywordNode(isntKeyword));
    this.alternatives.push(new KeywordNode(andKeyword));
    this.alternatives.push(new KeywordNode(orKeyword));
    super.parseText(text.trimStart());
  }

  compile(): string {
    const code = super.compile();

    return code;
  }
}
