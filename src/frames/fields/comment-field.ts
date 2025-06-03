import { CodeSource } from "../interfaces/code-source";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../interfaces/parse-node";
import { CommentNode } from "../parse-nodes/comment-node";
import { ParseStatus } from "../status-enums";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class CommentField extends AbstractField {
  isParseByNodes = true;

  constructor(holder: Frame) {
    super(holder);
    this.setOptional(true);
    this.setPlaceholder("<i>comment</i>");
  }
  helpId(): string {
    return "CommentField";
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
    const txt = this.isSelected()
      ? this.textAsHtml()
      : this.handleLeadingAndMultipleSpaces(this.textAsHtml());
    return `<el-field id="${this.htmlId}" class="${this.cls()}" tabindex=0><el-txt>${txt}</el-txt><el-place>${this.placeholder}</el-place><el-compl>${this.getCompletion()}</el-compl>${this.getMessage()}${this.helpAsHtml()}</el-field>`;
  }

  // Converts leading spaces to &nbsp; and multi-spaces to a space + &nbsp;s
  handleLeadingAndMultipleSpaces(raw: string): string {
    const words = raw.split(" ");
    const withNbsp = words.map((w) => (w === "" ? "&nbsp;" : w + " "));
    return withNbsp.join("").trimEnd();
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
