import { removeHtmlTagsAndEscChars } from "../frame-helpers";
import { File } from "../frame-interfaces/file";
import { ParseStatus } from "../status-enums";
import { AbstractSequence } from "./abstract-sequence";
import { Multiple } from "./multiple";

export class LitStringInterpolated extends AbstractSequence {
  segments: Multiple | undefined;

  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = `"string"`;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      const lang = this.file.language();
      if (text.startsWith(lang.INTERPOLATED_STRING_PREFIX)) {
        //TODO: Don't just add nodes, delegate the  parsing to lang - because of peculiarity of Java
        this.file.language().parseInterpolatedString(this, text);
      } else {
        this.status = ParseStatus.invalid;
        this.remainingText = text;
      }
    }
  }

  defaultParse(text: string) {
    super.parseText(text);
  }

  renderAsHtml(): string {
    return this.isValid()
      ? this.file.language().litStringInterpolatedAsHtml(this)
      : this.matchedText;
  }

  renderAsExport(): string {
    return this.isValid() ? removeHtmlTagsAndEscChars(this.renderAsHtml()) : this.matchedText;
  }

  renderAsElanSource(): string {
    return "$" + `"${this.segments!.renderAsElanSource()}"`;
  }
}
