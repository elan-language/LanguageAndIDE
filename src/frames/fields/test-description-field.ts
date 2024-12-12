import { CodeSource } from "../code-source";
import { escapeHtmlChars } from "../helpers";
import { Frame } from "../interfaces/frame";
import { CommentNode } from "../parse-nodes/comment-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class TestDescriptionField extends AbstractField {
  isParseByNodes = true;

  constructor(holder: Frame) {
    super(holder);
    this.setOptional(true);
    this.setPlaceholder("<i>(optional) name or description</i>");
    this.help = `Any text on a single line.`;
  }
  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new CommentNode();
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToEndOfLine();

  getIdPrefix(): string {
    return "ident";
  }
  renderAsHtml(): string {
    const txt = this.isSelected() ? this.textAsHtml() : escapeHtmlChars(this.textAsHtml());
    return `<el-field id="${this.htmlId}" class="${this.cls()}" tabindex=0><el-txt>${txt}</el-txt><el-place>${this.placeholder}</el-place><el-compl>${this.getCompletion()}</el-compl>${this.getMessage()}<el-help title="${this.help}">?</el-help></el-field>`;
  }

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }
}
