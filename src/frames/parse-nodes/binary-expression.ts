import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { BinaryOperation } from "./binary-operation";
import { BracketedExpressionOrTerm } from "./bracketedExprOrTerm";
import { ExprNode } from "./expr-node";
import { allIdsAndMethods, allKeywordsThatCanStartAnExpression } from "./parse-node-helpers";

export class BinaryExpression extends AbstractSequence {
  lhs: BracketedExpressionOrTerm | undefined;
  op: BinaryOperation | undefined;
  rhs: ExprNode | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = "<i>expression</i>";
  }

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.lhs = new BracketedExpressionOrTerm();
      this.addElement(this.lhs);
      this.op = new BinaryOperation();
      this.addElement(this.op);
      this.rhs = new ExprNode();
      this.addElement(this.rhs);
      return super.parseText(text);
    }
  }

  compile(): string {
    const codeArray = this.getElements().map((e) => e.compile());
    const code = codeArray.join("");
    return code;
  }

  renderAsHtml(): string {
    return `${this.lhs?.renderAsHtml()}${this.op!.renderAsHtml()}${this.rhs?.renderAsHtml()}`;
  }
  renderAsSource(): string {
    return `${this.lhs?.renderAsSource()}${this.op!.renderAsSource()}${this.rhs?.renderAsSource()}`;
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
