import { thisKeyword } from "../../../compiler/elan-keywords";
import { ParseStatus } from "../status-enums";
import { KeywordCompletion } from "../symbol-completion-helpers";
import { AbstractParseNode } from "./abstract-parse-node";

export class ThisInstance extends AbstractParseNode {
  parseText(text: string): void {
    const kw = this.file.language().THIS_INSTANCE;
    if (text.length > 0) {
      const textUC = text.toUpperCase();
      const kwUC = kw.toUpperCase();
      if (textUC.startsWith(kwUC)) {
        this.status = ParseStatus.valid;
        this.matchedText = kw;
        this.remainingText = text.substring(kw.length);
      } else if (kwUC.startsWith(textUC)) {
        this.status = ParseStatus.incomplete;
        this.matchedText = text;
        this.remainingText = "";
      } else {
        this.status = ParseStatus.invalid;
        this.matchedText = "";
        this.remainingText = text;
      }
    }
  }

  override renderAsHtml(): string {
    const kw = this.file.language().THIS_INSTANCE;
    return this.isValid() ? `<el-kw>${kw}</el-kw>` : this.matchedText;
  }

  override renderAsElanSource(): string {
    return this.isValid() ? thisKeyword : this.matchedText;
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    const kw = this.file.language().THIS_INSTANCE;
    return new Set<KeywordCompletion>([KeywordCompletion.create(kw, false, true)]);
  }
}
