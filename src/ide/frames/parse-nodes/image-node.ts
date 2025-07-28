import { imageKeyword } from "../../../compiler/keywords";
import { AbstractSequence } from "./abstract-sequence";
import { KeywordNode } from "./keyword-node";
import { OptionalNode } from "./optional-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { UrlNode } from "./url-node";
import { WithClause } from "./with-clause";

export class ImageNode extends AbstractSequence {
  url: UrlNode | undefined;
  withClause: OptionalNode | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new KeywordNode(imageKeyword));
      this.addElement(new SpaceNode(Space.added));
      this.url = new UrlNode();
      this.url.completionWhenEmpty = "<i>url</i>";
      this.addElement(this.url);
      this.withClause = new OptionalNode(new WithClause(() => "ImageVG"));
      this.addElement(this.withClause);
      super.parseText(text);
    }
  }

  override renderAsHtml(): string {
    return `<img src="${this.url!.renderAsHtml()}">`;
  }
}
