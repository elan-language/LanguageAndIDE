import { CompileError } from "../compile-error";
import { AstNode } from "../compiler-interfaces/ast-node";
import { AstQualifierNode } from "../compiler-interfaces/ast-qualifier-node";
import { Scope } from "../compiler-interfaces/scope";
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
