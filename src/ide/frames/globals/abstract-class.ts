import { abstractClassKeywords, classKeyword, endKeyword } from "../../../compiler/keywords";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import {
  parentHelper_renderChildrenAsHtml,
  parentHelper_renderChildrenAsSource,
} from "../parent-helpers";
import { ClassFrame } from "./class-frame";

export class AbstractClass extends ClassFrame {
  constructor(parent: File) {
    super(parent);
    this.isAbstract = true;
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
<el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand>${this.language().renderTopAsHtml(this)}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${parentHelper_renderChildrenAsHtml(this)}
${this.language().renderBottomAsHtml(this)}
</el-class>`;
  }

  public renderAsSource(): string {
    return `${this.sourceAnnotations()}abstract class ${this.name.renderAsSource()}${this.inheritanceAsSource()}\r
${parentHelper_renderChildrenAsSource(this)}\r
end class\r\n`;
  }

  topKeywords(): string {
    return `${abstractClassKeywords} `;
  }

  bottomKeywords(): string {
    return `${endKeyword} ${classKeyword}`;
  }
}
