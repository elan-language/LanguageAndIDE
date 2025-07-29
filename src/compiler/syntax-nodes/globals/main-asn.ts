import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { DuplicateSymbol } from "../../../compiler/symbols/duplicate-symbol";
import { allScopedSymbols, getGlobalScope } from "../../../compiler/symbols/symbol-helpers";
import { mustNotHaveDuplicateMain } from "../../compile-rules";
import { CompoundWithStatementsAsn } from "../compound-with-statements-asn";

export class MainAsn extends CompoundWithStatementsAsn implements AstNode {
  constructor(
    public readonly fieldId: string,
    scope: Scope,
  ) {
    super(fieldId, scope);
  }

  indent() {
    return "";
  }

  get symbolId() {
    return "__main";
  }

  debugSymbols() {
    return () => allScopedSymbols(this.getParentScope(), this as unknown as Scope);
  }

  compile(): string {
    this.compileErrors = [];

    const existingMain = this.resolveSymbol("__main", this);

    if (existingMain instanceof DuplicateSymbol) {
      mustNotHaveDuplicateMain(this.compileErrors, this.fieldId);
    }

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `async function main() {\r
${this.breakPoint(this.debugSymbols())}${this.compileChildren()}\r
}\r
`;
  }
}
