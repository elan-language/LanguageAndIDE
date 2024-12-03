import { TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { ArrayNode } from "./array-list-node";
import { BracketedExpression } from "./bracketed-expression";
import { DictionaryNode } from "./dictionary-node";
import { ExprNode } from "./expr-node";
import { ImmutableDictionaryNode } from "./immutable-dictionary-node";
import { ListNode } from "./list-node";
import { LitValueNode } from "./lit-value";
import { ReferenceNode } from "./reference-node";
import { TupleNode } from "./tuple-node";
import { TypeOfNode } from "./type-of-node";
import { UnaryExpression } from "./unary-expression";

export class TermSimple extends AbstractAlternatives {
  defaultTokenTypes = new Set([
    TokenType.id_constant,
    TokenType.id_let,
    TokenType.id_parameter_out,
    TokenType.id_parameter_regular,
    TokenType.id_property,
    TokenType.id_variable,
    TokenType.id_enumValue,
    TokenType.method_function,
    TokenType.method_system,
  ]);

  constructor() {
    super();
    this.completionWhenEmpty = "<i>expression</i>";
  }

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.alternatives.push(new LitValueNode());
      this.alternatives.push(new ReferenceNode());
      this.alternatives.push(new TypeOfNode());
      this.alternatives.push(new ListNode(() => new ExprNode()));
      this.alternatives.push(new ArrayNode(() => new ExprNode()));
      this.alternatives.push(
        new DictionaryNode(
          () => new ExprNode(),
          () => new ExprNode(),
        ),
      );
      this.alternatives.push(
        new ImmutableDictionaryNode(
          () => new ExprNode(),
          () => new ExprNode(),
        ),
      );
      this.alternatives.push(new TupleNode());
      this.alternatives.push(new UnaryExpression());
      this.alternatives.push(new BracketedExpression());
      super.parseText(text);
    }
  }

  override symbolCompletion_toMatch(): string {
    const openers = ["(", "[", "{"]; //Ignore openers that could match > 1
    if (openers.includes(this.matchedText)) {
      return "";
    } else {
      return super.symbolCompletion_toMatch();
    }
  }
}
