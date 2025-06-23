import { AbstractFrame } from "../abstract-frame";
import { CommentField } from "../fields/comment-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { GlobalFrame } from "../frame-interfaces/global-frame";
import { commentMarker } from "../keywords";

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
  renderAsHtml(): string {
    return `<el-global><el-comment class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}><el-top>${this.bpAsHtml()}# ${this.text.renderAsHtml()}</el-top></el-comment></el-global>`;
  }

  indent(): string {
    return "";
  }
  renderAsSource(): string {
    return `# ${this.text.renderAsSource()}`;
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove("# ");
    this.text.parseFrom(source);
    source.removeNewLine();
  }
}
