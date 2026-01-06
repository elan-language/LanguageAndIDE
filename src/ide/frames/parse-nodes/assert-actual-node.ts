import { ParseStatus } from "../status-enums";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { IdentifierNode } from "./identifier-node";
import { MethodCallNode } from "./method-call-node";
import { TermChained } from "./term-chained";
import { TermSimple } from "./term-simple";
import { File } from "../frame-interfaces/file";

export class AssertActualNode extends AbstractAlternatives {
  idTypes: Set<TokenType> = new Set([TokenType.id_let, TokenType.id_variable]);
  methodTypes: Set<TokenType> = new Set([TokenType.method_function]);
  constructor(file: File) {
    super(file);
    this.alternatives.push(new IdentifierNode(file, this.idTypes));
    this.alternatives.push(new MethodCallNode(file, this.methodTypes));
    this.alternatives.push(new TermSimple(file));
    this.alternatives.push(new TermChained(file));
  }

  override parseText(text: string): void {
    super.parseText(text);
    if (this.status === ParseStatus.valid && text.includes(" is ")) {
      this.status = ParseStatus.invalid;
    }
  }
}
