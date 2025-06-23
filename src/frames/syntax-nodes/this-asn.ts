import { mustBeInsideClass } from "../compile-rules";
import { AstNode } from "../compiler-interfaces/ast-node";
import { Scope } from "../frame-interfaces/scope";
import { thisKeyword } from "../keywords";
import { getGlobalScope, isInsideClass } from "../symbols/symbol-helpers";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";

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
    return this.scope.resolveSymbol(thisKeyword, transforms(), this.scope)?.symbolType();
  }

  toString() {
    return this.originalKeyword;
  }
}
