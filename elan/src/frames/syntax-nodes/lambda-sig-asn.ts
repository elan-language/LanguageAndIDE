import { ElanSymbol } from "../interfaces/symbol";
import { SymbolType } from "../interfaces/symbol-type";
import { UnknownType } from "../symbols/unknown-type";
import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "../interfaces/ast-node";
import { ParamDefAsn } from "./param-def-asn";
import { Transforms } from "./transforms";
import { SymbolScope } from "../symbols/symbol-scope";
import { Parent } from "../interfaces/parent";

export class LambdaSigAsn extends AbstractAstNode implements Scope, AstNode {
  constructor(
    private readonly parameters: ParamDefAsn[],
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  getParent(): Parent {
    return this.scope as Parent;
  }

  aggregateCompileErrors(): CompileError[] {
    let cc: CompileError[] = [];
    for (const i of this.parameters) {
      cc = cc.concat(i.aggregateCompileErrors());
    }
    return this.compileErrors.concat(cc);
  }

  symbolType() {
    return UnknownType.Instance;
  }

  parameterTypes() {
    return this.parameters.map((p) => p.symbolType());
  }

  compile(): string {
    this.compileErrors = [];
    return this.parameters.map((p) => p.compile()).join(", ");
  }

  resolveSymbol(id: string | undefined, transforms: Transforms, scope: Scope): ElanSymbol {
    for (const p of this.parameters) {
      if (p.id.trim() === id) {
        return {
          symbolId: id,
          symbolType: () => p.symbolType(),
          symbolScope: SymbolScope.local,
        };
      }
    }
    return this.scope.resolveSymbol(id, transforms, this);
  }

  toString() {
    const pp = this.parameters.map((p) => p.toString()).join(", ");

    return `${pp}`;
  }
}
