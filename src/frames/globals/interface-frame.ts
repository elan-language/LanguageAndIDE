import { Deprecated } from "../../elan-type-interfaces";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../interfaces/transforms";
import { noTypeOptions } from "../interfaces/type-options";
import { abstractClassKeywords, endKeyword, interfaceKeyword } from "../keywords";
import {
  parentHelper_renderChildrenAsHtml,
  parentHelper_renderChildrenAsSource,
} from "../parent-helpers";
import { ClassSubType, ClassType } from "../symbols/class-type";
import { ClassFrame } from "./class-frame";

export class InterfaceFrame extends ClassFrame {
  constructor(parent: File) {
    super(parent);
    this.isAbstract = true;
    this.isInterface = true;
  }

  ofTypes: SymbolType[] = [];

  deprecated: Deprecated | undefined = undefined;

  initialKeywords(): string {
    return abstractClassKeywords;
  }
  get symbolId() {
    return this.name.text;
  }
  symbolType(transforms?: Transforms) {
    const [cd] = this.lookForCircularDependencies(this, [this.name.text], transforms!);

    return new ClassType(
      this.symbolId,
      ClassSubType.interface,
      false,
      noTypeOptions,
      cd ? [] : this.inheritance.symbolTypes(transforms),
      this,
    );
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
<el-top>${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>${interfaceKeyword} </el-kw>${this.name.renderAsHtml()}${this.helpAsHtml()}${this.inheritanceAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${parentHelper_renderChildrenAsHtml(this)}
<el-kw>${endKeyword} ${interfaceKeyword}</el-kw>
</el-class>`;
  }

  public renderAsSource(): string {
    return `${interfaceKeyword} ${this.name.renderAsSource()}${this.inheritanceAsSource()}\r
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
