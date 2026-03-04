import { Regexes } from "../fields/regexes";
import { renderBackslashNasABreak } from "../frame-helpers";
import { File } from "../frame-interfaces/file";
import { RegExMatchNode } from "./regex-match-node";

export class LitStringText extends RegExMatchNode {
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
