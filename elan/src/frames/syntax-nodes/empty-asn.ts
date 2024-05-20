import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { UnknownType } from "../symbols/unknown-type";
import { SymbolScope } from "../symbols/symbol-scope";

export class EmptyAsn implements AstNode {
  constructor(public readonly fieldId: string) {}

  symbolScope = SymbolScope.unknown;

  compileErrors: CompileError[] = [];

  aggregateCompileErrors(): CompileError[] {
    return [];
  }

  compile(): string {
    return ``;
  }

  symbolType() {
    return UnknownType.Instance;
  }

  toString() {
    return "";
  }

  isEmpty = true;
}
