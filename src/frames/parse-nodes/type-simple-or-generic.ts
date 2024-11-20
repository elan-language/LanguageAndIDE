import { TokenType } from "../helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { TypeGenericNode } from "./type-generic-node";
import { TypeSimpleNode } from "./type-simple-node";

export class TypeSimpleOrGeneric extends AbstractAlternatives {
  tokenTypes: TokenType[] = [];

  constructor(tokenTypes: TokenType[]) {
    super();
    this.completionWhenEmpty = "<i>Type</i>";
    this.tokenTypes = tokenTypes;
  }
  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.alternatives.push(new TypeSimpleNode(this.tokenTypes));
      this.alternatives.push(new TypeGenericNode(this.tokenTypes));
      super.parseText(text);
    }
  }
}
