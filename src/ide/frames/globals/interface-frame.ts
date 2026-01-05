import { abstractClassKeywords, endKeyword, interfaceKeyword } from "../../../compiler/keywords";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import {
  parentHelper_renderChildrenAsHtml,
  parentHelper_renderChildrenAsSource,
} from "../parent-helpers";
import { ClassFrame } from "./class-frame";

export class InterfaceFrame extends ClassFrame {
  constructor(parent: File) {
    super(parent);
    this.isAbstract = true;
    this.isInterface = true;
    this.canHaveBreakPoint = false;
  }

  initialKeywords(): string {
    return abstractClassKeywords;
  }

  doesInherit(): boolean {
    return this.inheritance.text !== "";
  }

  getFields(): Field[] {
    return [this.name, this.inheritance];
  }

  getIdPrefix(): string {
    return "class";
  }

  public renderAsHtml(): string {
    return `<el-class class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}>
<el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>${interfaceKeyword} </el-kw>${this.name.renderAsHtml()}${this.inheritanceAsHtml()}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${parentHelper_renderChildrenAsHtml(this)}
${this.language().renderBottomAsHtml(this)}
</el-class>`;
  }

  public renderAsSource(): string {
    return `${this.sourceAnnotations()}${interfaceKeyword} ${this.name.renderAsSource()}${this.inheritanceAsSource()}\r
${parentHelper_renderChildrenAsSource(this)}\r
${endKeyword} ${interfaceKeyword}\r\n`;
  }

  topKeywords(): string {
    return `${interfaceKeyword} `;
  }

  bottomKeywords(): string {
    return `${endKeyword} ${interfaceKeyword}`;
  }
}
