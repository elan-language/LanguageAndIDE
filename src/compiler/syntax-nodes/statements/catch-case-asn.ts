import { mustBeException } from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { ElanSymbol } from "../../compiler-interfaces/elan-symbol";
import { Scope } from "../../compiler-interfaces/scope";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { childSymbolMatches, compileNodes, getChildSymbol } from "../ast-helpers";
import { BreakpointAsn } from "../breakpoint-asn";

export class CatchCaseAsn extends BreakpointAsn {
  constructor(
    private readonly type: string,
    fieldId: string,
    scope: Scope,
  ) {
    super(fieldId, scope);
  }

  getCurrentScope(): Scope {
    return this.compileScope ?? this;
  }

  compile(): string {
    this.compileErrors = [];

    const type = this.scope.resolveSymbol(this.type, false, this);
    const scope = type.symbolScope === SymbolScope.stdlib ? "_stdlib." : "";

    mustBeException(type, this.compileErrors, this.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.indent()}if (e instanceof ${scope}${type.symbolId}) {
${compileNodes(this.compileChildren)}
${this.indent()}}`;
  }

  compileChildren: AstNode[] = [];

  setCompileScope(s: Scope) {
    this.compileScope = s;
    this.compileChildren = [];
  }

  addChild(f: AstNode) {
    this.compileChildren.push(f);
  }

  getOuterScope() {
    // need to get scope of TryStatement
    return this.getCurrentScope().getParentScope();
  }

  resolveSymbol(id: string, caseSensitive: boolean, initialScope: Scope): ElanSymbol {
    return (
      getChildSymbol(this.compileChildren, id, caseSensitive, initialScope) ??
      this.getOuterScope().resolveSymbol(id, caseSensitive, this.getCurrentScope())
    );
  }

  symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = this.getOuterScope().symbolMatches(id, all, this.getCurrentScope());

    return childSymbolMatches(this.compileChildren, id, all, matches, initialScope);
  }
}
