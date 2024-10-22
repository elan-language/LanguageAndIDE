import { libraryKeyword, propertyKeyword } from "../keywords";
import { AbstractAlternatives } from "./abstract-alternatives";
import { KeywordNode } from "./keyword-node";

export class Qualifier extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "";
  }

  parseText(text: string): void {
    const lib = new KeywordNode(libraryKeyword);
    const prop = new KeywordNode(propertyKeyword);
    this.alternatives.push(lib);
    this.alternatives.push(prop);
    super.parseText(text);
  }
}
