import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { AstQualifierNode } from "../../compiler/compiler-interfaces/ast-qualifier-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { CompileError } from "../compile-error";
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
