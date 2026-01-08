import { commentMarker } from "../../../compiler/keywords";
import { AbstractFrame } from "../abstract-frame";
import { CommentField } from "../fields/comment-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { GlobalFrame } from "../frame-interfaces/global-frame";

export class GlobalComment extends AbstractFrame implements GlobalFrame {
  isGlobal = true;
  public text: CommentField;
  file: File;
  constructor(parent: File) {
    super(parent);
    this.file = parent;
    this.text = new CommentField(this);
  }
  initialKeywords(): string {
    return commentMarker;
  }
  getFields(): Field[] {
    return [this.text];
  }

  getIdPrefix(): string {
    return "com";
  }

  frameSpecificAnnotation(): string {
    return "";
  }

  outerHtmlTag: string = "";

  renderAsHtml(): string {
    //Special case, as does not have functionality of an instuction
    return `<el-global>${this.contextMenu()}<el-comment class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}><el-top>${this.language().renderSingleLineAsHtml(this)}</el-top></el-comment></el-global>`;
  }

  indent(): string {
    return "";
  }
  renderAsElanSource(): string {
    return `${this.sourceAnnotations()}# ${this.text.renderAsElanSource()}`;
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove("# ");
    this.text.parseFrom(source);
    source.removeNewLine();
  }

  override deleteIfPermissible(): void {
    this.insertNewSelectorIfNecessary();
    this.delete();
  }
}
