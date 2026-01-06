import { commentMarker } from "../../../compiler/keywords";
import { AbstractFrame } from "../abstract-frame";
import { CommentField } from "../fields/comment-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";

export class CommentStatement extends AbstractFrame implements Statement {
  isStatement = true;
  isMember = true;
  isAbstract = false;
  private = false;
  public text: CommentField;
  constructor(parent: Parent) {
    super(parent);
    this.text = new CommentField(this);
  }

  initialKeywords(): string {
    return commentMarker;
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove("# ");
    this.text.parseFrom(source);
    source.removeNewLine();
  }

  getFields(): Field[] {
    return [this.text];
  }

  getIdPrefix(): string {
    return "com";
  }

  renderAsHtml(): string {
    //Special case - does not have many of the capabilities of instructions
    return `<el-statement>${this.contextMenu()}<el-comment class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}><el-top>${this.language().renderSingleLineAsHtml(this)}</el-top></el-comment></el-statement>`;
  }

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}# ${this.text.renderAsElanSource()}`;
  }

  override deleteIfPermissible(): void {
    this.insertNewSelectorIfNecessary();
    this.delete();
  }
}
