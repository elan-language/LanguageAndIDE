import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import { CommentField } from "../fields/comment-field";
import { ConcreteClass } from "../globals/concrete-class";
import { Field } from "../interfaces/field";
import { Member } from "../interfaces/member";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { commentMarker } from "../keywords";
import { Transforms } from "../syntax-nodes/transforms";

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

  getClass(): ConcreteClass {
    return this.getParent() as ConcreteClass;
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
    return `<el-statement>${this.bpAsHtml}<el-comment class="${this.cls()}" id='${this.htmlId}' tabindex="0"><el-top>${this.bpAsHtml}<el-kw># </el-kw>${this.text.renderAsHtml()}</el-top></el-comment></el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}# ${this.text.renderAsSource()}`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];

    const astNode = this.text.getOrTransformAstNode(transforms);
    astNode.compile();
    return "";
  }
}
