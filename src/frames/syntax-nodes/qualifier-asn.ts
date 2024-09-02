import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { AstQualifierNode } from "../interfaces/ast-qualifier-node";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { isAstIdNode, transforms } from "./ast-helpers";

export class QualifierAsn extends AbstractAstNode implements AstQualifierNode {
  constructor(
    public readonly value: AstNode,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  compileErrors: CompileError[] = [];

  aggregateCompileErrors(): CompileError[] {
    const q = this.value.aggregateCompileErrors();
    return this.compileErrors.concat(q);
  }

  compile(): string {
    const s = this.compileAsParameter();
    return s === "" ? "" : `${s}.`;
  }

  compileAsParameter(): string {
    this.compileErrors = [];
    return this.value.compile();
  }

  symbolType() {
    if (isAstIdNode(this.value)) {
      return this.scope
        .getParentScope()
        .resolveSymbol(this.value.id, transforms(), this.scope)
        .symbolType(transforms());
    }

    return this.value.symbolType();
  }

  toString() {
    return `${this.value}.`;
  }
}
