import { constantKeyword } from "../../../compiler/keywords";
import { ConstantValueField } from "../fields/constant-value-field";
import { IdentifierField } from "../fields/identifier-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Collapsible } from "../frame-interfaces/collapsible";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { GlobalFrame } from "../frame-interfaces/global-frame";
import { SingleLineFrame } from "../single-line-frame";

export class ConstantGlobal extends SingleLineFrame implements GlobalFrame, Collapsible {
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

  getFieldsDefaultImpl(): Field[] {
    return [this.name, this.value];
  }

  getIdPrefix(): string {
    return "const";
  }

  frameSpecificAnnotation(): string {
    return "constant";
  }

  override outerHtmlTag: string = "el-const";

  renderAsHtml(): string {
    //In this special case </el-top> is provided by the language rendering
    return `<${this.outerHtmlTag} class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}><el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand>${this.language().renderSingleLineAsHtml(this)}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.annotationAsHtml()}${this.getFrNo()}</${this.outerHtmlTag}>`;
  }

  indent(): string {
    return "";
  }
  renderAsElanSource(): string {
    return `${this.sourceAnnotations()}constant ${this.name.renderAsElanSource()} set to ${this.value.renderAsElanSource()}\r
`;
  }
}
