import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { SymbolType } from "../../../compiler/compiler-interfaces/symbol-type";
import { StringType } from "../../../compiler/symbols/string-type";
import { SymbolScope } from "../../../compiler/symbols/symbol-scope";
import { getId } from "../../compile-rules";
import { catchKeyword, exceptionKeyword, inKeyword } from "../../keywords";
import { symbolMatches } from "../../symbols/symbol-helpers";
import { childSymbolMatches, compileNodes, getChildSymbol } from "../ast-helpers";
import { BreakpointAsn } from "../breakpoint-asn";
import { EmptyAsn } from "../empty-asn";

export class CatchAsn extends BreakpointAsn {
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

  indent() {
    return this.parentIndent(); //overrides the additional indent added for most child statements
  }

  keywords = `${catchKeyword} ${exceptionKeyword} ${inKeyword} `;

  compile(): string {
    this.compileErrors = [];
    const vid = this.variable.compile();
    return `${this.parentIndent()}} catch (_${vid}) {\r
${this.indent()}${this.singleIndent()}let ${vid} = _${vid}.message;
${compileNodes(this.compileChildren)}\r`;
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

  resolveSymbol(id: string, initialScope: Scope): ElanSymbol {
    if (getId(this.variable) === id) {
      return this;
    }
    return (
      getChildSymbol(this.compileChildren, id, initialScope) ??
      this.getOuterScope().resolveSymbol(id, this.getCurrentScope())
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
