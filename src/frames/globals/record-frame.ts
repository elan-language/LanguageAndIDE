import { Deprecated } from "../../elan-type-interfaces";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../interfaces/transforms";
import { immutableTypeOptions } from "../interfaces/type-options";
import { endKeyword, recordKeyword } from "../keywords";
import {
  parentHelper_renderChildrenAsHtml,
  parentHelper_renderChildrenAsSource,
} from "../parent-helpers";
import { ClassSubType, ClassType } from "../symbols/class-type";
import { SymbolScope } from "../symbols/symbol-scope";
import { ClassFrame } from "./class-frame";

export class RecordFrame extends ClassFrame {
  hrefForFrameHelp: string = "LangRef.html#record";

  constructor(parent: File) {
    super(parent);
    this.isNotInheritable = true;
    this.isRecord = true;
  }

  ofTypes: SymbolType[] = [];

  deprecated: Deprecated | undefined = undefined;

  initialKeywords(): string {
    return recordKeyword;
  }

  get symbolId() {
    return this.name.text;
  }
  symbolType(_transforms?: Transforms) {
    return new ClassType(
      this.symbolId,
      ClassSubType.concrete,
      false,
      immutableTypeOptions,
      [],
      this,
    );
  }
  get symbolScope() {
    return SymbolScope.program;
  }

  getFields(): Field[] {
    return [this.name];
  }

  getIdPrefix(): string {
    return "class";
  }

  public renderAsHtml(): string {
    return `<el-class class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>
<el-top>${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>record </el-kw>${this.name.renderAsHtml()}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${parentHelper_renderChildrenAsHtml(this)}
<el-kw>end record</el-kw>
</el-class>`;
  }

  public renderAsSource(): string {
    return `record ${this.name.renderAsSource()}\r
${parentHelper_renderChildrenAsSource(this)}\r
end record\r\n`;
  }

  public getDirectSuperClassesTypeAndName(_transforms: Transforms) {
    return [];
  }

  topKeywords(): string {
    return `${recordKeyword} `;
  }

  bottomKeywords(): string {
    return `${endKeyword} ${recordKeyword}`;
  }
}
