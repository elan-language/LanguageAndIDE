import { CodeSource } from "../frame-interfaces/code-source";
import { Frame } from "../frame-interfaces/frame";
import { ParseNode } from "../frame-interfaces/parse-node";
import { CommentNode } from "../parse-nodes/comment-node";
import { AbstractField } from "./abstract-field";

export class FileLoaderField extends AbstractField {
  isParseByNodes = false;

  constructor(holder: Frame) {
    super(holder);
  }

  helpId(): string {
    return "FileLoaderField";
  }

  initialiseRoot(): ParseNode {
    this.rootNode = new CommentNode();
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToEndOfLine();

  getIdPrefix(): string {
    return "comment";
  }
  renderAsHtml(): string {
    return `<el-field id="${this.htmlId}" class="${this.cls()}" tabindex="-1"><el-txt>To import code, select this field then press any key</el-txt>${this.helpAsHtml()}</el-field>`;
  }
  symbolCompletion(): string {
    return "";
  }
}
