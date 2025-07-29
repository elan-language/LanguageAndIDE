import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { CompoundAsn } from "../compound-asn";
import { EmptyAsn } from "../empty-asn";

export class GlobalCommentAsn extends CompoundAsn {
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
