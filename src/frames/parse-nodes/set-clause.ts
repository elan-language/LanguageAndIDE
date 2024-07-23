import { ExprNode } from "./expr-node";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { toKeyword } from "../keywords";

export class SetClause extends AbstractSequence {
  property: IdentifierNode | undefined;
  expr: ExprNode | undefined;

  parseText(text: string): void {
    this.property = new IdentifierNode();
    const sp0 = new SpaceNode(Space.required);
    const sp1 = new SpaceNode(Space.required);
    const to = new KeywordNode(toKeyword);
    this.expr = new ExprNode();
    this.addElement(this.property);
    this.addElement(sp0);
    this.addElement(to);
    this.addElement(sp1);
    this.addElement(this.expr);
    return super.parseText(text);
  }
  compile(): string {
    const codeArray = this.getElements().map((e) => e.compile());
    const code = codeArray.join(" ");

    return code;
  }
}
