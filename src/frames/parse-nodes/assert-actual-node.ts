import { ParseStatus } from "../status-enums";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { IdentifierNode } from "./identifier-node";
import { MethodCallNode } from "./method-call-node";
import { TermChained } from "./term-chained";
import { TermSimple } from "./term-simple";

export class AssertActualNode extends AbstractAlternatives {
  errorLink: string = "#parse_assert_actual";
  idTypes: Set<TokenType> = new Set([TokenType.id_let, TokenType.id_variable]);
  methodTypes: Set<TokenType> = new Set([TokenType.method_function]);
  constructor() {
    super();
    this.alternatives.push(new IdentifierNode(this.idTypes));
    this.alternatives.push(new MethodCallNode(this.methodTypes));
    this.alternatives.push(new TermSimple());
    this.alternatives.push(new TermChained());
  }

  override parseText(text: string): void {
    super.parseText(text);
    if (this.status === ParseStatus.valid && text.includes(" is ")) {
      this.status = ParseStatus.invalid;
    }
  }
}
