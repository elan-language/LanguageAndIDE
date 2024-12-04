import { CodeSource } from "../code-source";
import { escapeHtmlChars } from "../helpers";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../parse-nodes/parse-node";
import { RegExMatchNode } from "../parse-nodes/regex-match-node";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";
import { Regexes } from "./regexes";

export class CommentField extends AbstractField {
  isParseByNodes = true;

  constructor(holder: Frame) {
    super(holder);
    this.setOptional(true);
    this.setPlaceholder("<i>comment</i>");
    this.help = `Any text on a single line.`;
  }
  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new RegExMatchNode(Regexes.anythingToNewLineAsRegExp);
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToEndOfLine();

  getIdPrefix(): string {
    return "comment";
  }
  renderAsHtml(): string {
    const txt = this.isSelected() ? this.textAsHtml() : escapeHtmlChars(this.textAsHtml());
    return `<el-field id="${this.htmlId}" class="${this.cls()}" tabindex=0><el-txt>${txt}</el-txt><el-place>${this.placeholder}</el-place><el-compl>${this.getCompletion()}</el-compl>${this.getMessage()}<el-help title="${this.help}">?</el-help></el-field>`;
  }

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }
}
