import { Regexes } from "../fields/regexes";
import { imageKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { KeywordNode } from "./keyword-node";
import { OptionalNode } from "./optional-node";
import { Space } from "./parse-node-helpers";
import { RegExMatchNode } from "./regex-match-node";
import { SpaceNode } from "./space-node";
import { WithClause } from "./with-clause";

export class ImageNode extends AbstractSequence {
  url: RegExMatchNode | undefined;
  withClause: OptionalNode | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new KeywordNode(imageKeyword));
      this.addElement(new SpaceNode(Space.added));
      this.url = new RegExMatchNode(Regexes.url);
      this.addElement(this.url);
      this.withClause = new OptionalNode(new WithClause(() => "Image"));
      this.addElement(this.withClause);
      super.parseText(text);
    }
  }

  override renderAsHtml(): string {
    return `<img src="${this.url!.renderAsHtml()}">`;
  }
}
