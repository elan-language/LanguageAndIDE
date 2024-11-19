import { TokenType } from "../helpers";
import { toKeyword } from "../keywords";
import { ParseStatus } from "../status-enums";
import { AbstractSequence } from "./abstract-sequence";
import { ExprNode } from "./expr-node";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";

export class ToClause extends AbstractSequence {
  property: IdentifierNode | undefined;
  expr: ExprNode | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = "<i>name</i> to <i>expression</i>";
  }

  parseText(text: string): void {
    this.property = new IdentifierNode();
    const sp0 = new SpaceNode(Space.required);
    const to = new KeywordNode(toKeyword);
    const sp1 = new SpaceNode(Space.required);
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

  getSymbolCompletionSpec(): [string, TokenType] {
    const elems = this.getElements();
    if (elems[3].status === ParseStatus.valid) {
      return elems[4].getSymbolCompletionSpec();
    }

    if (elems[1].status !== ParseStatus.valid) {
      return [elems[0].matchedText, TokenType.property];
    }

    return ["", TokenType.none];
  }
}
