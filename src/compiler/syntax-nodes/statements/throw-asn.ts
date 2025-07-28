import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { EmptyAsn } from "../empty-asn";
import { FrameAsn } from "../frame-asn";

export class ThrowAsn extends FrameAsn {
  isStatement = true;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  text: AstNode = EmptyAsn.Instance;

  compile(): string {
    this.compileErrors = [];
    return `${this.indent()}${this.breakPoint(this.debugSymbols())}throw new Error(${this.text.compile()});`;
  }
}
