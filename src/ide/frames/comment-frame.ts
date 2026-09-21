import { commentMarker } from "../../compiler/elan-keywords";
import { AbstractField, commentFieldSpec } from "./fields/abstract-field";
import { singleIndent } from "./frame-helpers";
import { CodeSource } from "./frame-interfaces/code-source";
import { Field } from "./frame-interfaces/field";
import { Parent } from "./frame-interfaces/parent";
import { Statement } from "./frame-interfaces/statement";
import { SingleLineFrame } from "./single-line-frame";

export class CommentFrame extends SingleLineFrame implements Statement {
  isStatement = true;
  isMember = true;
  isGlobal = true;
  isAbstract = false;
  private = false;
  protected canHaveBreakPoint = false;

  public textIncludingMarkerSymboAndSpace: AbstractField;
  constructor(parent: Parent) {
    super(parent);
    this.textIncludingMarkerSymboAndSpace = new AbstractField(this, commentFieldSpec);
  }

  initialKeywords(): string {
    return commentMarker;
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    this.textIncludingMarkerSymboAndSpace.parseFrom(source);
    source.removeNewLine();
  }

  getFields(): Field[] {
    return [this.textIncludingMarkerSymboAndSpace];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_com`;
  }

  frameSpecificAnnotation(): string {
    return "";
  }

  private isGlobalComment() {
    return "isFile" in this.getParent();
  }

  renderAsHtml(): string {
    //Special case - does not have many of the capabilities of instructions
    const startTag = this.isGlobalComment() ? "<el-global>" : "<el-statement>";
    const endTag = this.isGlobalComment() ? "</el-global>" : "</el-statement>";
    return `${startTag}${this.contextMenu()}<el-comment class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}><el-top>${this.language().renderSingleLineAsHtml(this)}</el-top></el-comment>${endTag}`;
  }

  override indent(): string {
    return this.isGlobalComment() ? "" : this.getParent().indent() + singleIndent();
  }

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${this.textIncludingMarkerSymboAndSpace.renderAsElanSource()}`;
  }

  override deleteIfPermissible(): void {
    this.insertNewSelectorIfNecessary();
    this.delete();
  }
}
