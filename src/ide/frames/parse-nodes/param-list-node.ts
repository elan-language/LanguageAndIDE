import { removeHtmlTagsAndEscChars } from "../frame-helpers";
import { File } from "../frame-interfaces/file";
import { CSV } from "./csv";
import { ParamDefNode } from "./param-def-node";
import { removeUnmatchedClosingBracket } from "./parse-node-helpers";

export class ParamListNode extends CSV {
  constructor(file: File) {
    super(file, () => new ParamDefNode(file), 0);
    this.setSyntaxCompletionWhenEmpty("<i>parameter definitions</i>");
  }
  parseText(text: string): void {
    text = removeUnmatchedClosingBracket(text);
    super.parseText(text);
  }

  override renderAsHtml(): string {
    return this.isValid() ? super.renderAsHtml() : this.matchedText;
  }

  override renderAsExport(): string {
    return this.isValid() ? removeHtmlTagsAndEscChars(this.renderAsHtml()) : this.matchedText;
  }

  override renderAsElanSource(): string {
    return super.renderAsElanSource();
  }
}
