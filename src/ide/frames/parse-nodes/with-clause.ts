import { withKeyword } from "../keywords";
import { KeywordCompletion } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SetToClause } from "./set-to-clause";
import { SpaceNode } from "./space-node";

export class WithClause extends AbstractSequence {
  toClauses: CSV | undefined;
  private context: () => string;

  constructor(context: () => string) {
    super();
    this.context = context;
    this.completionWhenEmpty = " with <i>name</i> set to <i>expression</i>";
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new SpaceNode(Space.added));
      this.addElement(new KeywordNode(withKeyword));
      this.addElement(new SpaceNode(Space.required));
      this.toClauses = new CSV(() => new SetToClause(this.context), 1);
      this.addElement(this.toClauses);
      return super.parseText(text);
    }
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.getElements().length === 0
      ? new Set<KeywordCompletion>([KeywordCompletion.create(withKeyword)])
      : super.symbolCompletion_keywords();
  }

  override renderAsHtml(): string {
    return `<el-kw> with </el-kw>${this.toClauses?.renderAsHtml()}`;
  }
}
