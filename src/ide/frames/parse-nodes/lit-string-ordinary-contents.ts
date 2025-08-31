import { Regexes } from "../fields/regexes";
import { renderDoubleSpaceAfterCharAsLineBreak } from "../frame-helpers";
import { RegExMatchNode } from "./regex-match-node";

export class LitStringOrdinaryContents extends RegExMatchNode {
  constructor() {
    super(Regexes.nonEmptyStringContent);
  }

  parseText(text: string): void {
    super.parseText(text);
  }
  renderAsHtml(): string {
    return `${renderDoubleSpaceAfterCharAsLineBreak(super.renderAsHtml())}`;
  }
}
