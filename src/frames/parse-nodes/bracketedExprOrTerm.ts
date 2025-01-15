import { AbstractAlternatives } from "./abstract-alternatives";
import { BracketedExpression } from "./bracketed-expression";
import { allIds } from "./parse-node-helpers";
import { Term } from "./term";

// A reference node is a variable, or a functionCall, or just 'this'
export class BracketedExpressionOrTerm extends AbstractAlternatives {
  tokenTypes = new Set(allIds);

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.alternatives.push(new BracketedExpression());
      this.alternatives.push(new Term());
      super.parseText(text);
    }
  }
}
