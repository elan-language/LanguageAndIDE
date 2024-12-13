import { CompileError } from "../compile-error";
import { mustBeKnownSymbol } from "../compile-rules";
import { isScope } from "../frame-helpers";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { EnumType } from "../symbols/enum-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";

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

    mustBeKnownSymbol(symbol, undefined, this.compileErrors, this.fieldId);

    if (isScope(symbol)) {
      const value = symbol.resolveSymbol(this.value, transforms(), this.scope);
      mustBeKnownSymbol(value, undefined, this.compileErrors, this.fieldId);
    }

    return `${this.type.name}.${this.value}`;
  }

  symbolType() {
    return this.type;
  }

  toString() {
    return `${this.type.name}.${this.value}`;
  }
}
