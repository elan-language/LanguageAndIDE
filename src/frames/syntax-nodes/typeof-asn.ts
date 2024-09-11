import { CompileError } from "../compile-error";
import { mustNotBeKeyword } from "../compile-rules";
import { AstIdNode } from "../interfaces/ast-id-node";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { StringType } from "../symbols/string-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";

export class TypeOfAsn extends AbstractAstNode {
  constructor(
    public readonly ast: AstNode,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors;
  }

  compile(): string {
    this.compileErrors = [];

    return `"${this.ast.symbolType()}"`;
  }

  symbolType() {
    return StringType.Instance;
  }

  toString() {
    return this.ast.symbolType().toString();
  }
}
