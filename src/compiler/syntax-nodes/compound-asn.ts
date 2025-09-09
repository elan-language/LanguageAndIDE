import { AstNode } from "../compiler-interfaces/ast-node";
import { ElanSymbol } from "../compiler-interfaces/elan-symbol";
import { Scope } from "../compiler-interfaces/scope";
import { BreakpointEvent } from "../debugging/breakpoint-event";
import {
  getIdsFromString,
  handleDeconstruction,
  isSymbol,
  symbolMatches,
} from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { compileNodes, isAstNode } from "./ast-helpers";
import { BreakpointAsn } from "./breakpoint-asn";
import { AssertAsn } from "./statements/assert-asn";

export class CompoundAsn extends BreakpointAsn implements AstNode, Scope {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  children: AstNode[] = [];

  protected paused = false;

  getFirstChild(): AstNode {
    return this.children[0];
  }

  getCurrentScope(): Scope {
    return this;
  }

  getChildRange(first: AstNode, last: Scope): AstNode[] {
    const fst = this.children.indexOf(first);
    const lst = isAstNode(last) ? this.children.indexOf(last) : -1;
    return fst < lst ? this.children.slice(fst, lst + 1) : this.children.slice(lst, fst + 1);
  }

  resolveSymbol(id: string, initialScope: Scope): ElanSymbol {
    const fst = this.getFirstChild();
    let range = this.getChildRange(fst, initialScope);
    if (range.length > 1) {
      range = range.slice(0, range.length - 1);

      for (const f of range) {
        if (isSymbol(f) && id) {
          const sids = getIdsFromString(f.symbolId);
          if (sids.includes(id)) {
            return f;
          }
        }
      }
    }

    return this.getParentScope().resolveSymbol(id, this.getCurrentScope());
  }

  isNotGlobalOrLib(s: ElanSymbol) {
    const scope = s.symbolScope;

    return !(scope === SymbolScope.program || scope === SymbolScope.stdlib);
  }

  bpIndent() {
    return this.indent() === "" ? "  " : this.indent();
  }

  protected compileChildren(): string {
    return compileNodes(this.children);
  }

  getAsserts() {
    const children = this.children;
    let asserts = this.children.filter((c) => c instanceof AssertAsn);

    for (const f of children.filter((c) => c instanceof CompoundAsn)) {
      asserts = asserts.concat(f.getAsserts());
    }

    return asserts;
  }

  updateBreakpoints(event: BreakpointEvent): void {
    super.updateBreakpoints(event);
    for (const child of this.children.filter((f) => f instanceof BreakpointAsn)) {
      child.updateBreakpoints(event);
    }
  }

  symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = this.getParentScope().symbolMatches(id, all, this.getCurrentScope());
    let localMatches: ElanSymbol[] = [];

    const fst = this.getFirstChild();
    let range = this.getChildRange(fst, initialScope);
    if (range.length > 1) {
      range = range.slice(0, range.length - 1);
      const symbols = handleDeconstruction(range.filter((r) => isSymbol(r)));
      localMatches = symbolMatches(id, all, symbols);
    }

    return localMatches.concat(matches);
  }
}
