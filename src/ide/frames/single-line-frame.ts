import { AbstractFrame } from "./abstract-frame";

export abstract class SingleLineFrame extends AbstractFrame {
  outerHtmlTag: string = "el-statement"; // Overridden by non-statement single line frames

  renderAsHtml(): string {
    return `<${this.outerHtmlTag} class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}>${this.contextMenu()}${this.bpAsHtml()}${this.language().renderSingleLineAsHtml(this)}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.annotationAsHtml()}${this.getFrNo()}</${this.outerHtmlTag}>`;
  }
}
