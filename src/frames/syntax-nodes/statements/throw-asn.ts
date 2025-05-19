import { AstNode } from "../../interfaces/ast-node";
import { Scope } from "../../interfaces/scope";
import { FrameAsn } from "../frame-asn";

export class ThrowAsn extends FrameAsn {
  isStatement = true;

  constructor(
    private readonly text: AstNode,
    fieldId: string,
    scope: Scope,
  ) {
    super(fieldId, scope);
  }

  compile(): string {
    this.compileErrors = [];
    return `${this.indent()}${this.breakPoint(this.debugSymbols())}throw new Error(${this.text.compile()});`;
  }
}
