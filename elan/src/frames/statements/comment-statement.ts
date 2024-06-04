import { CommentField } from "../fields/comment-field";
import { Member } from "../interfaces/member";
import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../interfaces/statement";
import { commentMarker } from "../keywords";

export class CommentStatement extends AbstractFrame implements Statement, Member {
  isStatement = true;
  isMember = true;
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
    return `<statement><comment class="${this.cls()}" id='${this.htmlId}' tabindex="0"><top><keyword># </keyword>${this.text.renderAsHtml()}</top></comment></statement>`;
  }
  renderAsSource(): string {
    return `${this.indent()}# ${this.text.renderAsSource()}`;
  }
  compile(): string {
    this.compileErrors = [];
    return "";
  }
}
