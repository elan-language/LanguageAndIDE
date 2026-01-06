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
      this.addElement(new KeywordNode(this.file, lambdaKeyword));
      this.addElement(new SpaceNode(this.file, Space.required));
      const paramList = () => new CSV(this.file, () => new ParamDefNode(this.file, false), 1);
      const sp = () => new SpaceNode(this.file, Space.required);
      const paramListSp = new Sequence(this.file, [paramList, sp]);
      this.params = new OptionalNode(this.file, paramListSp);
      this.params.setSyntaxCompletionWhenEmpty("<i>name</i> as <i>Type</i>, ...");
      this.addElement(this.params);
      const arrow = new PunctuationNode(this.file, ARROW);
      this.addElement(arrow);
      this.addElement(new SpaceNode(this.file, Space.required));
      this.expr = new ExprNode(this.file);
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
