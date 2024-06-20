import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";
import { AstIdNode } from "../interfaces/ast-id-node";
import { mustNotBeKeyword } from "../compile-rules";

export class IdDefAsn extends AbstractAstNode implements AstIdNode {
  constructor(
    public readonly id: string,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
    this.id = id.trim();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors;
  }

  compile(): string {
    this.compileErrors = [];
    mustNotBeKeyword(this.id, this.compileErrors, this.fieldId);
    return this.id;
  }

  symbolType() {
    return this.scope.resolveSymbol(this.id, transforms(), this.scope).symbolType(transforms());
  }

  toString() {
    return this.id;
  }
}
