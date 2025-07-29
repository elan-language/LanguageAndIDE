import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { BreakpointAsn } from "../breakpoint-asn";
import { EmptyAsn } from "../empty-asn";

export class GlobalCommentAsn extends BreakpointAsn {
  isGlobal = true;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  text: AstNode = EmptyAsn.Instance;

  compile(): string {
    this.compileErrors = [];
    this.text.compile();
    return "";
  }
}
