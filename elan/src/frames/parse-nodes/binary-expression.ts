import { ExprNode } from "./expr-node";
import { BinaryOperation } from "./binary-operation";
import { AbstractSequence } from "./abstract-sequence";
import { Term } from "./term";
import { SpaceNode } from "./space-node";
import { Space as Space } from "./parse-node-helpers";
import { DIVIDE, MULT, POWER } from "../symbols";

export class BinaryExpression extends AbstractSequence {
  lhs: Term | undefined;
  op: BinaryOperation | undefined;
  rhs: Term | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = "expression";
  }

  parseText(text: string): void {
    this.lhs = new Term();
    this.addElement(this.lhs);
    this.addElement(new SpaceNode(Space.ignored));
    this.op = new BinaryOperation();
    this.addElement(this.op);
    this.addElement(new SpaceNode(Space.ignored));
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
    const op = this.op?.bestMatch?.matchedText;
    let sp = op ? " " : "";
    if (op && [MULT,DIVIDE,POWER].includes(op)) {
      sp = "";
    }
    return `${this.lhs?.renderAsHtml()}${sp}${this.op!.renderAsHtml()}${sp}${this.rhs?.renderAsHtml()}`;
  }
  renderAsSource(): string {
    const op = this.op?.bestMatch?.matchedText;
    let sp = op ? " " : "";
    if (op && [MULT,DIVIDE,POWER].includes(op)) {
      sp = "";
    } 
    return `${this.lhs?.renderAsSource()}${sp}${this.op!.renderAsSource()}${sp}${this.rhs?.renderAsSource()}`;
  }
}
