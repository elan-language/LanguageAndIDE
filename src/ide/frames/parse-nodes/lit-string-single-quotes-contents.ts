import { Regexes } from "../fields/regexes";
import { renderBackslashNasABreak } from "../frame-helpers";
import { RegExMatchNode } from "./regex-match-node";

export class LitStringSingleQuotesContents extends RegExMatchNode {
  constructor() {
    super(Regexes.nonInterpolatedStringContent);
  }

  sanitise(s: string) {
    return s.replaceAll("\r", "").replaceAll("\n", "\\n");
  }

  override renderAsSource(): string {
    const s = this.sanitise(this.matchedText);
    return s.trim();
  }

  parseText(text: string): void {
    super.parseText(text);
  }
  renderAsHtml(): string {
    return `${renderBackslashNasABreak(super.renderAsHtml())}`;
  }
}
