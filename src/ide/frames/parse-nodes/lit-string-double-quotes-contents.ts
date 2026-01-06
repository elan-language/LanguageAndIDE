import { Regexes } from "../fields/regexes";
import { renderBackslashNasABreak } from "../frame-helpers";
import { RegExMatchNode } from "./regex-match-node";
import { File } from "../frame-interfaces/file";

export class LitStringDoubleQuotesContents extends RegExMatchNode {
  constructor(file: File) {
    super(file, Regexes.nonEmptyStringContent);
  }

  parseText(text: string): void {
    super.parseText(text);
  }
  renderAsHtml(): string {
    return `${renderBackslashNasABreak(super.renderAsHtml())}`;
  }
}
