import { elseKeyword, ifKeyword, thenKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { ExprNode } from "./expr-node";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";

export class IfExpr extends AbstractSequence {
  condition: ExprNode | undefined;
  whenTrue: ExprNode | undefined;
  whenFalse: ExprNode | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new KeywordNode(ifKeyword));
      this.addElement(new SpaceNode(Space.required));
      this.condition = new ExprNode();
      this.condition.setCompletionWhenEmpty("<pr>condition </pr>");
      this.addElement(this.condition);
      this.addElement(new SpaceNode(Space.required));
      this.addElement(new KeywordNode(thenKeyword));
      this.addElement(new SpaceNode(Space.required));
      this.whenTrue = new ExprNode();
      this.addElement(this.whenTrue);
      this.addElement(new SpaceNode(Space.required));
      this.addElement(new KeywordNode(elseKeyword));
      this.addElement(new SpaceNode(Space.required));
      this.whenFalse = new ExprNode();
      this.addElement(this.whenFalse);
      super.parseText(text);
    }
  }
}
