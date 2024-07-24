import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { AstQualifierNode } from "../interfaces/ast-qualifier-node";
import { Scope } from "../interfaces/scope";
import { globalKeyword } from "../keywords";
import { getParentScope } from "../symbols/symbol-helpers";
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
    const s = this.value.compile();

    if (s === globalKeyword) {
      return "";
    }

    return `${s}`;
  }

  symbolType() {
    if (isAstIdNode(this.value)) {
      return getParentScope(this.scope)
        .resolveSymbol(this.value.id, transforms(), this.scope)
        .symbolType(transforms());
    }

    return this.value.symbolType();
  }

  toString() {
    const s = this.value.toString();

    if (s === globalKeyword) {
      return "";
    }

    return `${s}.`;
  }
}
