import { Regexes } from "../fields/regexes";
import { DOUBLE_QUOTES } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { Multiple } from "./multiple";
import { PunctuationNode } from "./punctuation-node";
import { RegExMatchNode } from "./regex-match-node";
import { StringInterpolation } from "./string-interpolation";

export class LitStringNonEmpty extends AbstractSequence {
  segments: Multiple | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = `"string"`;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      const field = () => new StringInterpolation();
      const plainText = () => new RegExMatchNode(Regexes.nonEmptyStringContent);
      const segment = () => new Alternatives([field, plainText]);
      this.segments = new Multiple(segment, 1);
      this.addElement(new PunctuationNode(DOUBLE_QUOTES));
      this.addElement(this.segments);
      this.addElement(new PunctuationNode(DOUBLE_QUOTES));
      super.parseText(text);
    }
  }
  renderAsHtml(): string {
    return `<string>"${this.segments!.renderAsHtml()}"</string>`;
  }
}
