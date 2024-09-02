import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { TypeAsn } from "./type-asn";

export class EmptyTypeAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly type: TypeAsn,
    public readonly fieldId: string,
    scope: Scope,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors.concat(this.type.aggregateCompileErrors());
  }

  compile(): string {
    this.compileErrors = [];

    return this.type.compileToEmptyObjectCode();
  }

  symbolType() {
    return this.type.symbolType();
  }

  toString() {
    return `Default (${this.type})`;
  }
}
