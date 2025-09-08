import { Regexes } from "../fields/regexes";
import { renderBackslashNasABreak } from "../frame-helpers";
import { RegExMatchNode } from "./regex-match-node";

export class LitStringDoubleQuotesContents extends RegExMatchNode {
  constructor() {
    super(Regexes.nonEmptyStringContent);
  }

  parseText(text: string): void {
    super.parseText(text);
  }
  renderAsHtml(): string {
    return `${renderBackslashNasABreak(super.renderAsHtml())}`;
  }
}
