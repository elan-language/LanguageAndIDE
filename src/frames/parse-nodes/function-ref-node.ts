import { functionKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";

export class FunctionRefNode extends AbstractSequence {
  name: IdentifierNode | undefined;

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.addElement(new KeywordNode(functionKeyword));
      this.addElement(new SpaceNode(Space.required));
      this.name = new IdentifierNode();
      this.addElement(this.name);
      super.parseText(text);
    }
  }
  renderAsHtml(): string {
    return `<keyword>function</keyword> <method>${this.name!.renderAsHtml()}</method>`;
  }
}
