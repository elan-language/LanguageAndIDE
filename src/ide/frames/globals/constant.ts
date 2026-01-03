import { constantKeyword } from "../../../compiler/keywords";
import { AbstractFrame } from "../abstract-frame";
import { ConstantValueField } from "../fields/constant-value-field";
import { IdentifierField } from "../fields/identifier-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Collapsible } from "../frame-interfaces/collapsible";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { GlobalFrame } from "../frame-interfaces/global-frame";

export class Constant extends AbstractFrame implements GlobalFrame, Collapsible {
  isCollapsible: boolean = true;
  isGlobal = true;
  name: IdentifierField;
  value: ConstantValueField;
  file: File;
  isConstant = true;
  constructor(parent: File) {
    super(parent);
    this.file = parent;
    this.name = new IdentifierField(this);
    this.value = new ConstantValueField(this);
    this.value.setPlaceholder("<i>literal value or data structure</i>");
    this.canHaveBreakPoint = false;
  }
  initialKeywords(): string {
    return constantKeyword;
  }
  parseFrom(source: CodeSource): void {
    source.remove("constant ");
    this.name.parseFrom(source);
    source.remove(" set to ");
    this.value.parseFrom(source);
  }

  protected setClasses() {
    super.setClasses();
    this.pushClass(true, "multiline");
  }

  getFields(): Field[] {
    return [this.name, this.value];
  }

  getIdPrefix(): string {
    return "const";
  }

  renderAsHtml(): string {
    return `<el-const class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}>
    <el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand>${this.name.renderAsHtml()}</el-top>
     = ${this.isImported() ? "" : this.value.renderAsHtml()}
     ${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.annotationAsHtml()}${this.getFrNo()}</el-const>`;
  }

  indent(): string {
    return "";
  }
  renderAsSource(): string {
    return `${this.sourceAnnotations()}constant ${this.name.renderAsSource()} set to ${this.value.renderAsSource()}\r
`;
  }

  override isWithinAnImportedFrame(): boolean {
    return false; // So that frame number is still added
  }
}
