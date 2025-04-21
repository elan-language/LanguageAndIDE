import { CodeSource } from "../code-source";
import { escapeHtmlInclSpaces } from "../frame-helpers";
import { Frame } from "../interfaces/frame";
import { CommentNode } from "../parse-nodes/comment-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { ParseStatus } from "../status-enums";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

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
    this.rootNode = new CommentNode();
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToEndOfLine();

  getIdPrefix(): string {
    return "comment";
  }
  renderAsHtml(): string {
    const txt = this.isSelected() ? this.textAsHtml() : escapeHtmlInclSpaces(this.textAsHtml());
    return `<el-field id="${this.htmlId}" class="${this.cls()}" tabindex=0><el-txt>${txt}</el-txt><el-place>${this.placeholder}</el-place><el-compl>${this.getCompletion()}</el-compl>${this.getMessage()}<el-help title="${this.help}">?</el-help></el-field>`;
  }

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }

  //Overridden to avoid trimming
  parseCompleteTextUsingNode(text: string, root: ParseNode): void {
    this.parseErrorLink = "";
    if (text.length === 0) {
      this.setParseStatus(this.isOptional() ? ParseStatus.valid : ParseStatus.incomplete);
    } else {
      root.parseText(text);
      this.setParseStatus(root.status);
      this.text = root.renderAsSource();
    }
  }
}
