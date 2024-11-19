import { TokenType } from "../helpers";
import { ParseStatus } from "../status-enums";
import { AbstractSequence } from "./abstract-sequence";
import { BinaryOperation } from "./binary-operation";
import { ExprNode } from "./expr-node";
import { Term } from "./term";

export class BinaryExpression extends AbstractSequence {
  lhs: Term | undefined;
  op: BinaryOperation | undefined;
  rhs: ExprNode | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = "<i>expression</i>";
  }

  parseText(text: string): void {
    this.lhs = new Term();
    this.addElement(this.lhs);
    this.op = new BinaryOperation();
    this.addElement(this.op);
    this.rhs = new ExprNode();
    this.addElement(this.rhs);
    return super.parseText(text);
  }

  compile(): string {
    const codeArray = this.getElements().map((e) => e.compile());
    const code = codeArray.join("");
    return code;
  }

  renderAsHtml(): string {
    return `${this.lhs?.renderAsHtml()}${this.op!.renderAsHtml()}${this.rhs?.renderAsHtml()}`;
  }
  renderAsSource(): string {
    return `${this.lhs?.renderAsSource()}${this.op!.renderAsSource()}${this.rhs?.renderAsSource()}`;
  }

  getSymbolCompletionSpec(): [string, TokenType] {
    if (this.rhs && this.rhs.status === ParseStatus.valid) {
      return this.rhs.getSymbolCompletionSpec();
    }

    if (this.lhs && this.lhs?.remainingText !== " ") {
      return this.lhs.getSymbolCompletionSpec();
    }

    return ["", TokenType.none];
  }
}
