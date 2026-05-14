import { lambdaKeyword } from "../../../compiler/elan-keywords";
import { removeHtmlTagsAndEscChars } from "../frame-helpers";
import { KeywordCompletion } from "../symbol-completion-helpers";
import { ARROW } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { ExprNode } from "./expr-node";
import { OptionalNode } from "./optional-node";

export class Lambda extends AbstractSequence {
  params: OptionalNode | undefined;
  expr: ExprNode | undefined;

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.file.language().addNodesForLambda(this);
      super.parseText(text);
    }
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.getElements().length === 0
      ? new Set<KeywordCompletion>([KeywordCompletion.create(lambdaKeyword)])
      : super.symbolCompletion_keywords();
  }

  renderAsHtml(): string {
    return this.isValid() || this.isIncomplete()
      ? this.file.language().lambdaAsHtml(this)
      : this.matchedText;
  }

  renderAsElanSource() {
    return this.isValid()
      ? `${lambdaKeyword} ${this.params?.renderAsElanSource()}${ARROW} ${this.expr!.renderAsElanSource()}`
      : this.matchedText;
  }

  override renderAsExport(): string {
    const lang = this.file.language();
    return this.isValid() ? removeHtmlTagsAndEscChars(lang.lambdaAsHtml(this)) : this.matchedText;
  }
}
