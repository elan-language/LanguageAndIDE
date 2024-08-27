import { globalKeyword, libraryKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { Dotted } from "./dotted";
import { IdentifierNode } from "./identifier-node";
import { InstanceNode } from "./instanceNode";
import { KeywordNode } from "./keyword-node";
import { OptionalNode } from "./optional-node";

export class InstanceProcRef extends AbstractSequence {
  qualifier: OptionalNode | undefined;
  simple: IdentifierNode | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = "variable";
  }

  parseText(text: string): void {
    if (text.length > 0) {
      const global = () => new Dotted(new KeywordNode(globalKeyword));
      const lib = () => new Dotted(new KeywordNode(libraryKeyword));
      const instance = () => new Dotted(new InstanceNode());
      const qualifier = new Alternatives([global, lib, instance]);
      this.qualifier = new OptionalNode(qualifier);
      this.simple = new IdentifierNode();
      this.addElement(this.qualifier!);
      this.addElement(this.simple!);
      super.parseText(text);
    }
  }

  renderAsHtml(): string {
    return `${this.qualifier!.matchedNode ? this.qualifier?.matchedNode.renderAsHtml() : ""}<method>${this.simple?.renderAsHtml()}</method>`;
  }
}
