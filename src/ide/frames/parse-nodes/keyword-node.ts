import { andKeyword, isKeyword, notKeyword, orKeyword } from "../../../compiler/keywords";
import { ParseStatus } from "../status-enums";
import { KeywordCompletion } from "../symbol-completion-helpers";
import { FixedTextNode } from "./fixed-text-node";
import { File } from "../frame-interfaces/file";

export class KeywordNode extends FixedTextNode {
  spaceAfter: boolean;
  dotAfter: boolean;

  constructor(file: File, keyword: string, spaceAfter = false, dotAfter = false) {
    super(file, keyword);
    this.spaceAfter = spaceAfter;
    this.dotAfter = dotAfter;
    this.completionWhenEmpty = keyword;
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      const target = this.fixedText;
      const trimmed = text.trimStart();
      const lcLetters = trimmed.match(/^[a-z]*/);
      if (lcLetters && lcLetters.length === 1) {
        if (lcLetters[0] === target) {
          const n = this.numLeadingSpaces(text) + this.fixedText.length;
          this.set(ParseStatus.valid, text.substring(0, n), text.substring(n));
          this._done = true;
        } else if (target.startsWith(trimmed)) {
          this.set(ParseStatus.incomplete, text, "");
        } else {
          this.set(ParseStatus.invalid, "", text);
        }
      }
    }
  }

  getSyntaxCompletionAsHtml(): string {
    let comp = ``;
    const matched = this.matchedText.length;
    const kw = this.fixedText.length;
    if (matched === 0) {
      comp = `${this.fixedText}`;
    } else if (matched === kw && this.remainingText === "") {
      comp = ``;
    } else if (matched < kw) {
      comp = `${this.fixedText.substring(this.matchedText.length)}`;
    }
    return comp;
  }

  renderAsHtml(): string {
    return `<el-kw>${this.renderAsElanSource()}</el-kw>`;
  }
  renderAsElanSource(): string {
    return this.matchedText.trim();
  }
  compile(): string {
    switch (this.fixedText) {
      case isKeyword:
        return "===";
      case `${isKeyword} ${notKeyword}`:
        return "!==";
      case notKeyword:
        return "!";
      case andKeyword:
        return "&&";
      case orKeyword:
        return "||";
      default:
        return this.matchedText;
    }
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    return new Set<KeywordCompletion>([
      KeywordCompletion.create(this.fixedText, this.spaceAfter, this.dotAfter),
    ]);
  }
}
