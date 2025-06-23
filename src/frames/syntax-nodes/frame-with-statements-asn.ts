import { AstNode } from "../compiler-interfaces/ast-node";
import { ElanSymbol } from "../compiler-interfaces/elan-symbol";
import { Scope } from "../compiler-interfaces/scope";
import { Transforms } from "../frame-interfaces/transforms";
import { BreakpointEvent } from "../status-enums";
import { getIds, handleDeconstruction, isSymbol, symbolMatches } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { compileNodes } from "./ast-helpers";
import { FrameAsn } from "./frame-asn";
import { AssertAsn } from "./statements/assert-asn";

export class FrameWithStatementsAsn extends FrameAsn implements AstNode, Scope {
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
    const lst = this.children.indexOf(last as unknown as AstNode);
    return fst < lst ? this.children.slice(fst, lst + 1) : this.children.slice(lst, fst + 1);
  }

  resolveSymbol(id: string, transforms: Transforms, initialScope: Scope): ElanSymbol {
    const fst = this.getFirstChild();
    let range = this.getChildRange(fst, initialScope);
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

    return this.getParentScope().resolveSymbol(id, transforms, this.getCurrentScope());
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
    let asserts = this.children.filter((c) => c instanceof AssertAsn) as AssertAsn[];

    for (const f of children.filter((c) => c instanceof FrameWithStatementsAsn)) {
      asserts = asserts.concat(f.getAsserts());
    }

    return asserts;
  }

  updateBreakpoints(event: BreakpointEvent): void {
    super.updateBreakpoints(event);
    for (const frame of this.children.filter((f) => f instanceof FrameAsn)) {
      frame.updateBreakpoints(event);
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
