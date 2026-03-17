import { removeHtmlTagsAndEscChars } from "../frame-helpers";
import { File } from "../frame-interfaces/file";
import { ParseStatus } from "../status-enums";
import { DOUBLE_QUOTES } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { LitStringField } from "./lit-string-field";
import { LitStringPlainText } from "./lit-string-plain-text";
import { Multiple } from "./multiple";
import { PunctuationNode } from "./punctuation-node";

export class LitStringInterpolated extends AbstractSequence {
  segments: Multiple | undefined;

  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = this.getCompletionFromLangOr(`"string"`);
  }

  parseText(text: string): void {
    if (text.length > 0) {
      const lang = this.file.language();
      const standardisedText = lang.standardiseInterpolatedString(this, text);
      if (standardisedText.length > 0) {
        const field = () => new LitStringField(this.file);
        const plainText = () => new LitStringPlainText(this.file);
        const segment = () => new Alternatives(this.file, [field, plainText]);
        this.segments = new Multiple(this.file, segment, 1);
        this.addElement(new PunctuationNode(this.file, "$"));
        this.addElement(new PunctuationNode(this.file, DOUBLE_QUOTES));
        this.addElement(this.segments);
        this.addElement(new PunctuationNode(this.file, DOUBLE_QUOTES));
        super.parseText(standardisedText);
      } else {
        this.status = ParseStatus.invalid;
        this.remainingText = text;
      }
    }
  }

  renderAsHtml(): string {
    return this.isValid()
      ? this.file.language().litStringInterpolatedAsHtml(this)
      : this.matchedText;
  }

  renderAsExport(): string {
    return removeHtmlTagsAndEscChars(this.renderAsHtml());
  }
}
