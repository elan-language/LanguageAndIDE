import { constants } from "async-file";
import { TokenType } from "../helpers";
import { ParseStatus } from "../status-enums";
import { CLOSE_BRACE, OPEN_BRACE } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { ExprNode } from "./expr-node";
import { PunctuationNode } from "./punctuation-node";

export class LitStringInterpolation extends AbstractSequence {
  expr: ExprNode | undefined;

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.addElement(new PunctuationNode(OPEN_BRACE));
      this.expr = new ExprNode();
      this.addElement(this.expr);
      this.addElement(new PunctuationNode(CLOSE_BRACE));
      super.parseText(text);
    }
  }
  renderAsHtml(): string {
    return `</el-str>{${this.expr!.renderAsHtml()}}<el-str>`; //Tags appear wrong way around - because field is breaking out of the string.
  }

  getToMatchAndTokenType(): [string, TokenType] {
    let result: [string, TokenType] = ["", TokenType.none];
    if (
      (this.matchedText.startsWith("{") && this.expr?.status === ParseStatus.empty) ||
      this.expr!.status === ParseStatus.incomplete
    ) {
      result = this.expr!.getToMatchAndTokenType();
    }
    return result;
  }
}
