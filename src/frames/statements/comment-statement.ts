import { AbstractFrame } from "../abstract-frame";
import { CommentField } from "../fields/comment-field";
import { CodeSource } from "../interfaces/code-source";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { commentMarker } from "../keywords";

export class CommentStatement extends AbstractFrame implements Statement {
  isStatement = true;
  isMember = true;
  isAbstract = false;
  private = false;
  public text: CommentField;
  hrefForFrameHelp: string = "LangRef.html#Comment";

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
    return `<el-statement>${this.bpAsHtml()}<el-comment class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}><el-top>${this.bpAsHtml()}<el-kw># </el-kw>${this.text.renderAsHtml()}</el-top></el-comment></el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}# ${this.text.renderAsSource()}`;
  }
}
