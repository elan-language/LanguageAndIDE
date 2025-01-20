import { CompileError } from "../compile-error";
import { mustBeInsideClass } from "../compile-rules";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { thisKeyword } from "../keywords";
import { isInsideClass } from "../symbols/symbol-helpers";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";

export class ThisAsn extends AbstractAstNode implements AstNode {
  constructor(
    private originalKeyword: string,
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

    if (!isInsideClass(this.scope)) {
      mustBeInsideClass(this.compileErrors, this.fieldId);
    }

    return thisKeyword;
  }

  symbolType() {
    return this.scope
      .resolveSymbol(thisKeyword, transforms(), this.scope)
      ?.symbolType(transforms());
  }

  toString() {
    return this.originalKeyword;
  }
}
