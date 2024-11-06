import { ParseStatus } from "../status-enums";
import { DIVIDE, MULT, POWER } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { BinaryOperation } from "./binary-operation";
import { ExprNode } from "./expr-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { Term } from "./term";

export class BinaryExpression extends AbstractSequence {
  lhs: Term | undefined;
  op: BinaryOperation | undefined;
  rhs: ExprNode | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = "<pr>expression</pr>";
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
