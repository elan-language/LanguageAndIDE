import { EnumType } from "../symbols/enum-type";
import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "../interfaces/ast-node";
import { transforms } from "./ast-helpers";
import { mustBeKnownSymbol } from "../compile-rules";
import { isScope } from "../helpers";

export class LiteralEnumAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly value: string,
    private readonly type: EnumType,
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

    const symbol = this.scope.resolveSymbol(this.type.name, transforms(), this.scope);

    mustBeKnownSymbol(symbol, this.compileErrors, this.fieldId);

    if (isScope(symbol)) {
      const value = symbol.resolveSymbol(this.value, transforms(), this.scope);
      mustBeKnownSymbol(value, this.compileErrors, this.fieldId);
    }

    return `${this.type.name}.${this.value}`;
  }

  symbolType() {
    return this.type;
  }

  toString() {
    return `(${this.type.name}).${this.value}`;
  }
}
