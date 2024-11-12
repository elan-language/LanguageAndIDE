import { Regexes } from "../fields/regexes";
import { TokenType } from "../helpers";
import { ParseStatus } from "../status-enums";
import { DOUBLE_QUOTES } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { LitStringInterpolation } from "./lit-string-interpolation";
import { LitStringOrdinaryContents } from "./lit-string-ordinary-contents";
import { Multiple } from "./multiple";
import { PunctuationNode } from "./punctuation-node";
import { RegExMatchNode } from "./regex-match-node";

export class LitStringNonEmpty extends AbstractSequence {
  segments: Multiple | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = `"string"`;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      const field = () => new LitStringInterpolation();
      const plainText = () => new LitStringOrdinaryContents();
      const segment = () => new Alternatives([field, plainText]);
      this.segments = new Multiple(segment, 1);
      this.addElement(new PunctuationNode(DOUBLE_QUOTES));
      this.addElement(this.segments);
      this.addElement(new PunctuationNode(DOUBLE_QUOTES));
      super.parseText(text);
    }
  }
  renderAsHtml(): string {
    return `<el-str>"${this.segments!.renderAsHtml()}"</el-str>`;
  }

  getToMatchAndTokenType(): [string, TokenType] {
    let result: [string, TokenType] = ["", TokenType.none];
    const active = this.getActiveParseNode();
    if (active !== this) {
      result = active.getToMatchAndTokenType();
    }
    return result;
  }
}
