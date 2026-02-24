import { File } from "../frame-interfaces/file";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { BracketedExpression } from "./bracketed-expression";
import { DictionaryNode } from "./dictionary-node";
import { ExprNode } from "./expr-node";
import { ListNode } from "./list-node";
import { LitValueNode } from "./lit-value-node";
import { ReferenceNode } from "./reference-node";
import { UnaryExpression } from "./unary-expression";

export class TermSimple extends AbstractAlternatives {
  defaultTokenTypes = new Set([
    TokenType.id_constant,
    TokenType.id_let,
    TokenType.id_parameter_regular,
    TokenType.id_property,
    TokenType.id_variable,
    TokenType.id_enumValue,
    TokenType.method_function,
    TokenType.method_system,
  ]);

  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = this.getCompletionFromLangOr("<i>expression</i>");
  }

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.alternatives.push(new ListNode(this.file, () => new ExprNode(this.file)));
      this.alternatives.push(
        new DictionaryNode(
          this.file,
          () => new ExprNode(this.file),
          () => new ExprNode(this.file),
        ),
      );
      this.alternatives.push(new UnaryExpression(this.file));
      this.alternatives.push(new BracketedExpression(this.file));
      this.alternatives.push(new LitValueNode(this.file));
      this.alternatives.push(new ReferenceNode(this.file));
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
