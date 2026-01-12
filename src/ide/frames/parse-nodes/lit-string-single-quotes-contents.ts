import { Regexes } from "../fields/regexes";
import { renderBackslashNasABreak } from "../frame-helpers";
import { RegExMatchNode } from "./regex-match-node";
import { File } from "../frame-interfaces/file";

export class LitStringSingleQuotesContents extends RegExMatchNode {
  constructor(file: File) {
    super(file, Regexes.nonInterpolatedStringContent);
  }

  sanitise(s: string) {
    return s.replaceAll("\r", "").replaceAll("\n", "\\n");
  }

  override renderAsElanSource(): string {
    return this.sanitise(this.matchedText);
  }

  parseText(text: string): void {
    super.parseText(text);
  }
  renderAsHtml(): string {
    return `${renderBackslashNasABreak(super.renderAsHtml())}`;
  }
}
