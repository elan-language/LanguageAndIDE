import { imageKeyword } from "../../../compiler/elan-keywords";
import { AbstractSequence } from "./abstract-sequence";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { UrlNode } from "./url-node";

export class ImageNode extends AbstractSequence {
  url: UrlNode | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new KeywordNode(this.file, imageKeyword));
      this.addElement(new SpaceNode(this.file, Space.added));
      this.url = new UrlNode(this.file);
      this.url.completionWhenEmpty = "<i>url</i>";
      this.addElement(this.url);
      super.parseText(text);
    }
  }

  override renderAsHtml(): string {
    return `<img src="${this.url!.renderAsHtml()}">`;
  }
}
