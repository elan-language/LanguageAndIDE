import { AbstractFrame } from "../abstract-frame";
import { ConstantValueField } from "../fields/constant-value-field";
import { IdentifierField } from "../fields/identifier-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Collapsible } from "../frame-interfaces/collapsible";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { GlobalFrame } from "../frame-interfaces/global-frame";
import { constantKeyword } from "../keywords";

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
    return `<el-const class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}><el-top>${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>constant </el-kw>${this.name.renderAsHtml()}</el-top><el-kw> set to </el-kw>${this.value.renderAsHtml()}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-const>`;
  }

  indent(): string {
    return "";
  }
  renderAsSource(): string {
    return `constant ${this.name.renderAsSource()} set to ${this.value.renderAsSource()}\r
`;
  }
}
