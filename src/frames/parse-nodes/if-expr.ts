import { elseKeyword, ifKeyword, thenKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { ExprNode2 } from "./expr-node2";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";

export class IfExpr extends AbstractSequence {
  condition: ExprNode2 | undefined;
  whenTrue: ExprNode2 | undefined;
  whenFalse: ExprNode2 | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new KeywordNode(ifKeyword));
      this.addElement(new SpaceNode(Space.required));
      this.condition = new ExprNode2();
      this.addElement(this.condition);
      this.addElement(new SpaceNode(Space.required));
      this.addElement(new KeywordNode(thenKeyword));
      this.addElement(new SpaceNode(Space.required));
      this.whenTrue = new ExprNode2();
      this.addElement(this.whenTrue);
      this.addElement(new SpaceNode(Space.required));
      this.addElement(new KeywordNode(elseKeyword));
      this.addElement(new SpaceNode(Space.required));
      this.whenFalse = new ExprNode2();
      this.addElement(this.whenFalse);
      super.parseText(text);
    }
  }
}
