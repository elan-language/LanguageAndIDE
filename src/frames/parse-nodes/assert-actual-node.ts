import { TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { IdentifierNode } from "./identifier-node";
import { MethodCallNode } from "./method-call-node";
import { TermChained } from "./term-chained";

export class AssertActualNode extends AbstractAlternatives {
  idTypes: Set<TokenType> = new Set([
    TokenType.id_let,
    TokenType.id_variable,
  ]);
  methodTypes: Set<TokenType> = new Set([
    TokenType.method_function,
  ]);
  constructor() {
    super();
    this.alternatives.push(new IdentifierNode(this.idTypes));
    this.alternatives.push(new MethodCallNode(this.methodTypes));
    this.alternatives.push(new TermChained());
  }
}
