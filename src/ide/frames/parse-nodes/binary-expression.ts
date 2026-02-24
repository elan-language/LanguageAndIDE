import { File } from "../frame-interfaces/file";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { BinaryOperation } from "./binary-operation";
import { ExprNode } from "./expr-node";
import { allIdsAndMethods, allKeywordsThatCanStartAnExpression } from "./parse-node-helpers";
import { Term } from "./term";

export class BinaryExpression extends AbstractSequence {
  lhs: Term | undefined;
  op: BinaryOperation | undefined;
  rhs: ExprNode | undefined;

  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = this.getCompletionFromLangOr("<i>expression</i>");
  }

  parseText(text: string): void {
    this.lhs = new Term(this.file);
    this.addElement(this.lhs);
    this.op = new BinaryOperation(this.file);
    this.addElement(this.op);
    this.rhs = new ExprNode(this.file);
    this.addElement(this.rhs);
    return super.parseText(text);
  }

  renderAsHtml(): string {
    return `${this.lhs?.renderAsHtml()}${this.op!.renderAsHtml()}${this.rhs?.renderAsHtml()}`;
  }

  renderAsElanSource(): string {
    return `${this.lhs?.renderAsElanSource()}${this.op!.renderAsElanSource()}${this.rhs?.renderAsElanSource()}`;
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    if (this.getElements().length === 0) {
      return new Set<TokenType>(allIdsAndMethods);
    } else {
      return super.symbolCompletion_tokenTypes();
    }
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.getElements().length === 0
      ? allKeywordsThatCanStartAnExpression
      : super.symbolCompletion_keywords();
  }
}
