import { ParseStatus } from "../status-enums";
import { DIVIDE, MULT, POWER } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { BinaryOperation } from "./binary-operation";
import { ExprNode2 } from "./expr-node2";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { Term2 } from "./term2";

export class BinaryExpression extends AbstractSequence {
  lhs: Term2 | undefined;
  op: BinaryOperation | undefined;
  rhs: ExprNode2 | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = "expression";
  }

  parseText(text: string): void {
    this.lhs = new Term2();
    this.addElement(this.lhs);
    this.addElement(new SpaceNode(Space.ignored));
    this.op = new BinaryOperation();
    this.addElement(this.op);
    this.addElement(new SpaceNode(Space.ignored));
    this.rhs = new ExprNode2();
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
    if (op && [MULT, DIVIDE, POWER].includes(op)) {
      sp = "";
    }
    return `${this.lhs?.renderAsHtml()}${sp}${this.op!.renderAsHtml()}${sp}${this.rhs?.renderAsHtml()}`;
  }
  renderAsSource(): string {
    let sp1 = "";
    let sp2 = "";
    const op = this.op!.bestMatch;
    if (op) {
      if (![MULT, DIVIDE, POWER].includes(op.matchedText)) {
        sp1 = " ";
        if (this.op!.status === ParseStatus.valid) {
          sp2 = " ";
        }
      }
    } else if (this.matchedText.endsWith(" ")) {
      this.remainingText = "";
      sp1 = " ";
    }
    return `${this.lhs?.renderAsSource()}${sp1}${this.op!.renderAsSource()}${sp2}${this.rhs?.renderAsSource()}`;
  }
}
