import { imageKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { KeywordNode } from "./keyword-node";
import { LitStringNonEmpty } from "./lit-string-non-empty";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";

export class TupleNode extends AbstractSequence {
  csv: CSV | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new KeywordNode(imageKeyword));
      this.addElement(new SpaceNode(Space.added));
      this.addElement(new LitStringNonEmpty());
      super.parseText(text);
    }
  }
}
