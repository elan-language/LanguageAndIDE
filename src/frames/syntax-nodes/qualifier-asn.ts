import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { AstQualifierNode } from "../interfaces/ast-qualifier-node";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";

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
    return this.value.symbolType();
  }

  toString() {
    return `${this.value}.`;
  }
}
