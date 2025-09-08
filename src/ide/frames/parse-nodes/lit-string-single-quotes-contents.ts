import { Regexes } from "../fields/regexes";
import { renderBackslashNasABreak } from "../frame-helpers";
import { RegExMatchNode } from "./regex-match-node";

export class LitStringSingleQuotesContents extends RegExMatchNode {
  constructor() {
    super(Regexes.nonInterpolatedStringContent);
  }

  parseText(text: string): void {
    super.parseText(text);
  }
  renderAsHtml(): string {
    return `${renderBackslashNasABreak(super.renderAsHtml())}`;
  }
}
