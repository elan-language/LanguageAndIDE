import { ExprNode } from "./expr-node";
import { BinaryOperation } from "./binary-operation";
import { AbstractSequence } from "./abstract-sequence";
import { setKeyword, toKeyword } from "../keywords";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";

export class SetClause extends AbstractSequence {
  property: IdentifierNode | undefined;
  expr: ExprNode | undefined;

  parseText(text: string): void {
    this.property = new IdentifierNode();
    const sp0 = new SpaceNode(Space.required);
    const set = new KeywordNode(setKeyword);
    const sp1 = new SpaceNode(Space.required);
    const to = new KeywordNode(toKeyword);
    const sp2 = new SpaceNode(Space.required);
    this.expr = new ExprNode();
    this.addElement(this.property);
    this.addElement(sp0);
    this.addElement(set);
    this.addElement(sp1);
    this.addElement(to);
    this.addElement(sp2);
    this.addElement(this.expr);
    return super.parseText(text);
  }
  compile(): string {
    const codeArray = this.getElements().map((e) => e.compile());
    const code = codeArray.join(" ");

    return code;
  }
}
