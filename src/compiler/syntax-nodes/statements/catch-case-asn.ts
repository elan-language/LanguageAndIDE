import { AstNode } from "../../compiler-interfaces/ast-node";
import { ElanSymbol } from "../../compiler-interfaces/elan-symbol";
import { Scope } from "../../compiler-interfaces/scope";
import { SymbolType } from "../../compiler-interfaces/symbol-type";
import { StringType } from "../../symbols/string-type";
import { SymbolScope } from "../../symbols/symbol-scope";
import { getId } from "../../compile-rules";
import { catchKeyword, exceptionKeyword, inKeyword } from "../../elan-keywords";
import { match, symbolMatches } from "../../symbols/symbol-helpers";
import { childSymbolMatches, compileNodes, getChildSymbol } from "../ast-helpers";
import { BreakpointAsn } from "../breakpoint-asn";
import { EmptyAsn } from "../empty-asn";

export class CatchCaseAsn extends BreakpointAsn {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  variable: AstNode = EmptyAsn.Instance;

  get symbolId() {
    return getId(this.variable);
  }

  symbolType(): SymbolType {
    return StringType.Instance;
  }

  get symbolScope() {
    return SymbolScope.parameter;
  }

  getCurrentScope(): Scope {
    return this.compileScope ?? this;
  }

  // indent() {
  //   return this.parentIndent(); //overrides the additional indent added for most child statements
  // }

  keywords = `${catchKeyword} ${exceptionKeyword} ${inKeyword} `;

  compile(): string {
    this.compileErrors = [];
    return `${this.indent()}if (e instanceof _stdlib.ElanRuntimeError) {
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
    if (match(getId(this.variable), id, caseSensitive)) {
      return this;
    }
    return (
      getChildSymbol(this.compileChildren, id, caseSensitive, initialScope) ??
      this.getOuterScope().resolveSymbol(id, caseSensitive, this.getCurrentScope())
    );
  }

  symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    let matches = this.getOuterScope().symbolMatches(id, all, this.getCurrentScope());
    const v = getId(this.variable);
    const counter = {
      symbolId: v,
      symbolType: () => StringType.Instance,
      symbolScope: SymbolScope.parameter,
    };

    matches = matches.concat(symbolMatches(id, all, [counter]));

    return childSymbolMatches(this.compileChildren, id, all, matches, initialScope);
  }
}
