import { AbstractFrame } from "./abstract-frame";

export abstract class SingleLineStatement extends AbstractFrame {
  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}>${this.contextMenu()}${this.bpAsHtml()}${this.language().renderSingleLineAsHtml(this)}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.annotationAsHtml()}${this.getFrNo()}</el-statement>`;
  }
}
