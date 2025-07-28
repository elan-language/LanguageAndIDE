import { TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { BracketedExpression } from "./bracketed-expression";
import { DictionaryNode } from "./dictionary-node";
import { ExprNode } from "./expr-node";
import { DictionaryImmutableNode } from "./immutable-dictionary-node";
import { ListImmutableNode } from "./list-immutable-node";
import { ListNode } from "./list-node";
import { LitValueNode } from "./lit-value-node";
import { ReferenceNode } from "./reference-node";
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
      this.alternatives.push(new ListImmutableNode(() => new ExprNode()));
      this.alternatives.push(new ListNode(() => new ExprNode()));
      this.alternatives.push(
        new DictionaryNode(
          () => new ExprNode(),
          () => new ExprNode(),
        ),
      );
      this.alternatives.push(
        new DictionaryImmutableNode(
          () => new ExprNode(),
          () => new ExprNode(),
        ),
      );
      this.alternatives.push(new UnaryExpression());
      this.alternatives.push(new BracketedExpression());
      this.alternatives.push(new LitValueNode());
      this.alternatives.push(new ReferenceNode());
      super.parseText(text);
    }
  }

  override symbolCompletion_toMatch(): string {
    const startsWithBracket = /[\[\(\{].*/;
    if (startsWithBracket.test(this.matchedText)) {
      return this.matchedText.slice(1);
    } else {
      return super.symbolCompletion_toMatch();
    }
  }
}
