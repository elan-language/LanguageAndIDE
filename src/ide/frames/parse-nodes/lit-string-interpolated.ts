import { File } from "../frame-interfaces/file";
import { DOUBLE_QUOTES } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { LitStringField } from "./lit-string-field";
import { Multiple } from "./multiple";
import { PunctuationNode } from "./punctuation-node";
import { RegExMatchNode } from "./regex-match-node";

export class LitStringInterpolated extends AbstractSequence {
  segments: Multiple | undefined;

  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = this.getCompletionFromLangOr(`"string"`);
  }

  parseText(text: string): void {
    if (text.length > 0) {
      const prefix = this.file.language().INTERPOLATED_STRING_PREFIX;
      const field = () => new LitStringField(this.file);
      const plainText = () => new RegExMatchNode(this.file, /^[^{"]+/);
      const segment = () => new Alternatives(this.file, [field, plainText]);
      this.segments = new Multiple(this.file, segment, 1);
      this.addElement(new PunctuationNode(this.file, prefix));
      this.addElement(new PunctuationNode(this.file, DOUBLE_QUOTES));
      this.addElement(this.segments);
      this.addElement(new PunctuationNode(this.file, DOUBLE_QUOTES));
      super.parseText(text);
    }
  }

  renderAsHtml(): string {
    const langPrefix = this.file.language().INTERPOLATED_STRING_PREFIX;
    const lang = this.file.language();
    const langSpecific = lang.renderNodeAsHtml(this);
    return langSpecific.length > 0
      ? langSpecific
      : `${langPrefix}"<el-lit>${this.segments!.renderAsHtml()}</el-lit>"`;
  }
}
