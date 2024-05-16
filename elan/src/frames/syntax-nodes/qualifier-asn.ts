import { UnknownType } from "../symbols/unknown-type";
import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { globalKeyword } from "../keywords";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";
import { AstNode } from "../interfaces/ast-node";
import { AstIdNode } from "../interfaces/ast-id-node";
import { AstQualifierNode } from "../interfaces/ast-qualifier-node";

export class QualifierAsn extends AbstractAstNode implements AstQualifierNode {
  constructor(
    public readonly value: AstIdNode,
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
    const id = this.value.id;
    return id
      ? this.scope
          .resolveSymbol(id, transforms(), this.scope)
          .symbolType(transforms())
      : UnknownType.Instance;
  }

  toString() {
    const s = this.value.toString();

    if (s === globalKeyword) {
      return "";
    }

    return `${s}.`;
  }
}
