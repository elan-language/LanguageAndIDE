import { lambdaKeyword } from "../keywords";
import { ARROW } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { KeywordNode } from "./keyword-node";
import { OptionalNode } from "./optional-node";
import { ParamDefNode } from "./param-def-node";
import { Space } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";
import { SpaceNode } from "./space-node";

export class Lambda extends AbstractSequence {
  params: OptionalNode | undefined;
  expr: ExprNode | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new KeywordNode(lambdaKeyword));
      this.addElement(new SpaceNode(Space.required));
      const paramList = new CSV(() => new ParamDefNode(), 1);
      this.params = new OptionalNode(paramList);
      this.addElement(this.params);
      this.addElement(new SpaceNode(Space.required));
      this.addElement(new PunctuationNode(ARROW));
      this.addElement(new SpaceNode(Space.required));
      this.expr = new ExprNode();
      this.addElement(this.expr);
      super.parseText(text);
    }
  }
}
