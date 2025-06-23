import { mustNotHaveDuplicateMain } from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { Scope } from "../../compiler-interfaces/scope";
import { DuplicateSymbol } from "../../symbols/duplicate-symbol";
import { allScopedSymbols, getGlobalScope } from "../../symbols/symbol-helpers";
import { transforms } from "../ast-helpers";
import { FrameWithStatementsAsn } from "../frame-with-statements-asn";

export class MainAsn extends FrameWithStatementsAsn implements AstNode {
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

    const existingMain = this.resolveSymbol("__main", transforms(), this);

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
