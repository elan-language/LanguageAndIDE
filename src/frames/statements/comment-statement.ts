import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import { CommentField } from "../fields/comment-field";
import { ClassFrame } from "../globals/class-frame";
import { Field } from "../interfaces/field";
import { Member } from "../interfaces/member";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { commentMarker } from "../keywords";

export class CommentStatement extends AbstractFrame implements Statement, Member {
  isStatement = true;
  isMember = true;
  isAbstract = false;
  private = false;
  public text: CommentField;

  constructor(parent: Parent) {
    super(parent);
    this.text = new CommentField(this);
  }

  getClass(): ClassFrame {
    return this.getParent() as ClassFrame;
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
