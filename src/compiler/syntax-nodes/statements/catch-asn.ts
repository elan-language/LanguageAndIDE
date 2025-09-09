import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { SymbolType } from "../../../compiler/compiler-interfaces/symbol-type";
import { StringType } from "../../../compiler/symbols/string-type";
import {
  getIds,
  handleDeconstruction,
  isSymbol,
  symbolMatches,
} from "../../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../../compiler/symbols/symbol-scope";
import { getId } from "../../compile-rules";
import { catchKeyword, exceptionKeyword, inKeyword } from "../../keywords";
import { compileNodes, isAstNode } from "../ast-helpers";
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
    // need to get scope of IfStatement
    return this.getCurrentScope().getParentScope();
  }

  getChildRange(initialScope: Scope) {
    const fst = this.compileChildren[0];
    const fi = this.compileChildren.indexOf(fst);
    const li = isAstNode(initialScope) ? this.compileChildren.indexOf(initialScope) : -1;

    return fi < li
      ? this.compileChildren.slice(fi, li + 1)
      : this.compileChildren.slice(li, fi + 1);
  }

  resolveSymbol(id: string, initialScope: Scope): ElanSymbol {
    if (getId(this.variable) === id) {
      return this;
    }
    if (this.compileChildren.length > 0) {
      let range = this.getChildRange(initialScope);

      if (range.length > 1) {
        range = range.slice(0, range.length - 1);

        for (const f of range) {
          if (isSymbol(f) && id) {
            const sids = getIds(f.symbolId);
            if (sids.includes(id)) {
              return f;
            }
          }
        }
      }
    }

    return this.getOuterScope().resolveSymbol(id, this.getCurrentScope());
  }

  symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = this.getOuterScope().symbolMatches(id, all, this.getCurrentScope());

    const v = getId(this.variable);
    let localMatches: ElanSymbol[] = [];

    if (id === v || all) {
      const counter = {
        symbolId: v,
        symbolType: () => StringType.Instance,
        symbolScope: SymbolScope.parameter,
      };
      localMatches.push(counter);
    }

    if (this.compileChildren.length > 0) {
      let range = this.getChildRange(initialScope);

      if (range.length > 1) {
        range = range.slice(0, range.length - 1);
        const symbols = handleDeconstruction(range.filter((r) => isSymbol(r)));
        localMatches = localMatches.concat(symbolMatches(id, all, symbols));
      }
    }
    return localMatches.concat(matches);
  }
}
