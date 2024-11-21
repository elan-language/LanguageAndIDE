import { SymbolCompletionSpec_Old, TokenType } from "../helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { BinaryExpression } from "./binary-expression";
import { CopyWith } from "./copy-with";
import { EmptyOfTypeNode } from "./empty-of-type-node";
import { IfExpr } from "./if-expr";
import { Lambda } from "./lambda";
import { NewInstance } from "./new-instance";
import { Term } from "./term";

export class ExprNode extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "<i>expression</i>";
  }

  parseText(text: string): void {
    //evaluate options that start with a keyword, first
    this.alternatives.push(new NewInstance());
    this.alternatives.push(new CopyWith());
    this.alternatives.push(new IfExpr());
    this.alternatives.push(new Lambda());
    this.alternatives.push(new EmptyOfTypeNode());
    //then others
    this.alternatives.push(new Term());
    this.alternatives.push(new BinaryExpression());
    super.parseText(text);
  }

  symbolCompletion_getSpec_Old(): SymbolCompletionSpec_Old {
    if (this.matchedText === "") {
      return new SymbolCompletionSpec_Old("", new Set<TokenType>([TokenType.expression]));
    }
    return super.symbolCompletion_getSpec_Old();
  }
}
