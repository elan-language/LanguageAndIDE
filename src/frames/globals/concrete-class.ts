import { Deprecated } from "../../elan-type-interfaces";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { classKeyword, endKeyword } from "../keywords";
import {
  parentHelper_renderChildrenAsHtml,
  parentHelper_renderChildrenAsSource,
} from "../parent-helpers";
import { ClassFrame } from "./class-frame";

export class ConcreteClass extends ClassFrame {
  constructor(parent: File) {
    super(parent);
    this.isConcrete = true;
  }

  deprecated: Deprecated | undefined = undefined;

  initialKeywords(): string {
    return classKeyword;
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
    return `<el-class class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>
<el-top>${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>class </el-kw>${this.name.renderAsHtml()}${this.inheritanceAsHtml()}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${parentHelper_renderChildrenAsHtml(this)}
<el-kw>end class</el-kw>
</el-class>`;
  }

  public renderAsSource(): string {
    return `class ${this.name.renderAsSource()}${this.inheritanceAsSource()}\r
${parentHelper_renderChildrenAsSource(this)}\r
end class\r\n`;
  }

  topKeywords(): string {
    return `${classKeyword} `;
  }

  bottomKeywords(): string {
    return `${endKeyword} ${classKeyword}`;
  }
}
