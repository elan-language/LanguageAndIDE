import { ifKeyword } from "../../../compiler/elan-keywords";
import { KeywordCompletion } from "../symbol-completion-helpers";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CommaNode } from "./comma-node";
import { ExprNode } from "./expr-node";
import { PunctuationNode } from "./punctuation-node";

export class IfExpr extends AbstractSequence {
  condition: ExprNode | undefined;
  whenTrue: ExprNode | undefined;
  whenFalse: ExprNode | undefined;

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.addElement(new PunctuationNode(this.file, `if_${OPEN_BRACKET}`));
      this.condition = new ExprNode(this.file);
      this.condition.setSyntaxCompletionWhenEmpty("<i>condition </i>");
      this.addElement(this.condition);
      this.addElement(new CommaNode(this.file));
      this.whenTrue = new ExprNode(this.file);
      this.addElement(this.whenTrue);
      this.addElement(new CommaNode(this.file));
      this.whenFalse = new ExprNode(this.file);
      this.addElement(this.whenFalse);
      this.addElement(new PunctuationNode(this.file, CLOSE_BRACKET));
      super.parseText(text);
    }
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.getElements().length === 0
      ? new Set<KeywordCompletion>([KeywordCompletion.create(ifKeyword)])
      : super.symbolCompletion_keywords();
  }

  override renderAsHtml(): string {
    return this.isValid()
      ? `<el-method>if_</el-method>(${this.condition?.renderAsHtml()}, ${this.whenTrue?.renderAsHtml()}, ${this.whenFalse?.renderAsHtml()})`
      : this.matchedText;
  }
}
