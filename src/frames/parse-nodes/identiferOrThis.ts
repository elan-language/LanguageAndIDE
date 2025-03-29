import { thisKeyword } from "../keywords";
import { AbstractAlternatives } from "./abstract-alternatives";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";

export class IdentifierOrThis extends AbstractAlternatives {
  parseText(text: string): void {
    this.alternatives.push(new IdentifierNode());
    this.alternatives.push(new KeywordNode(thisKeyword));
    super.parseText(text);
  }
}
