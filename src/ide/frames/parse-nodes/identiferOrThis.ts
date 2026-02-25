import { thisKeyword } from "../../../compiler/keywords";
import { AbstractAlternatives } from "./abstract-alternatives";
import { IdentifierUse } from "./identifier-use";
import { KeywordNode } from "./keyword-node";

export class IdentifierOrThis extends AbstractAlternatives {
  parseText(text: string): void {
    this.alternatives.push(new IdentifierUse(this.file));
    this.alternatives.push(new KeywordNode(this.file, thisKeyword));
    super.parseText(text);
  }
}
