import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../interfaces/transforms";

import { BreakpointStatus } from "../status-enums";
import { getIds, isSymbol } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { compileNodes } from "./ast-helpers";
import { FrameAsn } from "./frame-asn";
import { AssertAsn } from "./statements/assert-asn";

export class FrameWithStatementsAsn extends FrameAsn implements AstNode {
  constructor(
    protected readonly children: AstNode[],
    fieldId: string,
    scope: Scope,
  ) {
    super(fieldId, scope);
  }

  breakpointStatus: BreakpointStatus = BreakpointStatus.none;
  protected paused = false;

  symbolType(): SymbolType {
    throw new Error("Method not implemented.");
  }
  compile(): string {
    throw new Error("Method not implemented.");
  }
  aggregateCompileErrors(): CompileError[] {
    throw new Error("Method not implemented.");
  }

  getFirstChild(): AstNode {
    return this.children[0];
  }

  getCurrentScope(): Scope {
    return this as unknown as Scope;
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
}
