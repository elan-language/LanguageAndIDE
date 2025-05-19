import { CompileError } from "../compile-error";
import { mustNotHaveDuplicateMain } from "../compile-rules";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { DuplicateSymbol } from "../symbols/duplicate-symbol";
import { allScopedSymbols } from "../symbols/symbol-helpers";
import { transforms } from "./ast-helpers";
import { FrameAsn } from "./frame-asn";

export class MainFrameAsn extends FrameAsn implements AstNode {
  constructor(
    children: AstNode[],
    public readonly fieldId: string,
    scope: Scope,
  ) {
    super(children, fieldId, scope);
  }

  symbolType(): SymbolType {
    throw new Error("Method not implemented.");
  }

  debugSymbols() {
    return () => allScopedSymbols(this.getParentScope(), this as unknown as Scope);
  }

  compile(): string {
    this.compileErrors = [];

    const existingMain = this.resolveSymbol("__main", transforms(), this);

    if (existingMain instanceof DuplicateSymbol) {
      mustNotHaveDuplicateMain(this.compileErrors, this.fieldId);
    }

    return `async function main() {\r
    ${this.breakPoint(this.debugSymbols())}${this.compileChildren()}\r
    }\r
    `;
  }

  aggregateCompileErrors(): CompileError[] {
    throw new Error("Method not implemented.");
  }
}
