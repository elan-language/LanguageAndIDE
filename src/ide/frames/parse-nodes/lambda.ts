import { lambdaKeyword } from "../../../compiler/keywords";
import { KeywordCompletion } from "../symbol-completion-helpers";
import { ARROW } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { KeywordNode } from "./keyword-node";
import { OptionalNode } from "./optional-node";
import { ParamDefNode } from "./param-def-node";
import { Space } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";
import { Sequence } from "./sequence";
import { SpaceNode } from "./space-node";

export class Lambda extends AbstractSequence {
  params: OptionalNode | undefined;
  expr: ExprNode | undefined;

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.addElement(new KeywordNode(lambdaKeyword));
      this.addElement(new SpaceNode(Space.required));
      const paramList = () => new CSV(() => new ParamDefNode(true), 1);
      const sp = () => new SpaceNode(Space.required);
      const paramListSp = new Sequence([paramList, sp]);
      this.params = new OptionalNode(paramListSp);
      this.params.setSyntaxCompletionWhenEmpty("<i>name</i> as <i>Type</i>, ...");
      this.addElement(this.params);
      const arrow = new PunctuationNode(ARROW);
      this.addElement(arrow);
      this.addElement(new SpaceNode(Space.required));
      this.expr = new ExprNode();
      this.addElement(this.expr);
      super.parseText(text);
      if (!arrow.isEmpty()) {
        this.params.setSyntaxCompletionWhenEmpty("");
      }
    }
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.getElements().length === 0
      ? new Set<KeywordCompletion>([KeywordCompletion.create(lambdaKeyword)])
      : super.symbolCompletion_keywords();
  }
}
