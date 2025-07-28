import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { getGlobalScope, isInsideClass } from "../../compiler/symbols/symbol-helpers";
import { thisKeyword } from "../../ide/frames/keywords";
import { mustBeInsideClass } from "../compile-rules";
import { AbstractAstNode } from "./abstract-ast-node";

export class ThisAsn extends AbstractAstNode implements AstNode {
  constructor(
    private originalKeyword: "property" | "this",
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];

    if (!isInsideClass(this.scope)) {
      mustBeInsideClass(this.compileErrors, this.fieldId);
    }

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return thisKeyword;
  }

  symbolType() {
    return this.scope.resolveSymbol(thisKeyword, this.scope)?.symbolType();
  }

  toString() {
    return this.originalKeyword;
  }
}
