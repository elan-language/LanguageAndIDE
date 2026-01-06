import { endKeyword, recordKeyword } from "../../../compiler/keywords";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import {
  parentHelper_renderChildrenAsHtml,
  parentHelper_renderChildrenAsSource,
} from "../parent-helpers";
import { ClassFrame } from "./class-frame";

export class RecordFrame extends ClassFrame {
  constructor(parent: File) {
    super(parent);
    this.isNotInheritable = true;
    this.isRecord = true;
  }

  initialKeywords(): string {
    return recordKeyword;
  }

  getFields(): Field[] {
    return [this.name];
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

  public renderAsElanSource(): string {
    return `${this.sourceAnnotations()}record ${this.name.renderAsElanSource()}\r
${parentHelper_renderChildrenAsSource(this)}\r
end record\r\n`;
  }

  topKeywords(): string {
    return `${recordKeyword} `;
  }

  bottomKeywords(): string {
    return `${endKeyword} ${recordKeyword}`;
  }
}
