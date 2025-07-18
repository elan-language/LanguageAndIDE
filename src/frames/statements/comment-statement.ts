import { AbstractFrame } from "../abstract-frame";
import { CommentField } from "../fields/comment-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { commentMarker } from "../keywords";

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
    return `<el-statement>${this.bpAsHtml()}<el-comment class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}><el-top>${this.bpAsHtml()}<el-kw># </el-kw>${this.text.renderAsHtml()}</el-top></el-comment></el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}# ${this.text.renderAsSource()}`;
  }
}
