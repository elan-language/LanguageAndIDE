import { singleIndent } from "../frame-helpers";
import { AstNode } from "../interfaces/ast-node";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../interfaces/transforms";
import { BreakpointEvent, BreakpointStatus } from "../status-enums";
import { allScopedSymbols, orderSymbol } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { AbstractAstNode } from "./abstract-ast-node";

export class FrameAsn extends AbstractAstNode implements AstNode, Scope {
  constructor(
    public readonly fieldId: string,
    protected readonly scope: Scope,
  ) {
    super();
  }

  breakpointStatus: BreakpointStatus = BreakpointStatus.none;
  protected paused = false;

  symbolType(): SymbolType {
    throw new Error("Method not implemented.");
  }
  compile(): string {
    throw new Error("Method not implemented.");
  }

  compileScope: Scope | undefined;

  setCompileScope(s: Scope): void {
    this.compileScope = s;
  }

  getParentScope(): Scope {
    return this.compileScope ?? this.scope;
  }

  getCurrentScope(): Scope {
    return this as unknown as Scope;
  }

  indent(): string {
    return (this.scope as unknown as AstNode).indent() + singleIndent();
  }

  isNotGlobalOrLib(s: ElanSymbol) {
    const scope = s.symbolScope;

    return !(scope === SymbolScope.program || scope === SymbolScope.stdlib);
  }

  bpIndent() {
    return this.indent() === "" ? "  " : this.indent();
  }

  resolveVariables(scopedSymbols: () => ElanSymbol[]) {
    const resolveId: string[] = [];
    const symbols = scopedSymbols().filter(this.isNotGlobalOrLib).sort(orderSymbol);
    const indent = this.bpIndent();

    for (const symbol of symbols) {
      const idPrefix =
        symbol.symbolScope === SymbolScope.program
          ? "global."
          : symbol.symbolScope === SymbolScope.member
            ? "property."
            : "";

      const scopePrefix =
        symbol.symbolScope === SymbolScope.stdlib
          ? "_stdlib."
          : symbol.symbolScope === SymbolScope.program
            ? "global."
            : symbol.symbolScope === SymbolScope.member
              ? "this."
              : "";

      const id = `${idPrefix}${symbol.symbolId}`;
      const value = `${scopePrefix}${symbol.symbolId}`;
      resolveId.push(
        `${indent}_scopedIds${this.fieldId}.push(["${id}", await system.debugSymbol(${value})]);`,
      );
    }

    return `${resolveId.join("\r\n")}`;
  }

  breakPoint(scopedSymbols: () => ElanSymbol[]) {
    if (
      this.breakpointStatus === BreakpointStatus.active ||
      this.breakpointStatus === BreakpointStatus.singlestep
    ) {
      let resolve = this.resolveVariables(scopedSymbols);
      const type = this.breakpointStatus === BreakpointStatus.singlestep ? "true" : "false";
      const indent = this.bpIndent();

      if (this.breakpointStatus === BreakpointStatus.singlestep) {
        resolve = `${indent}if (__pause) {
    ${resolve}
    ${indent}}`;
      }

      resolve = `${indent}const _scopedIds${this.fieldId} = [];
    ${resolve}`;

      return `${resolve}\r\n${indent}__pause = await system.breakPoint(_scopedIds${this.fieldId}, "${this.fieldId}", ${type}, __pause);\r\n`;
    }

    return "";
  }

  resolveSymbol(id: string, transforms: Transforms, _initialScope: Scope): ElanSymbol {
    return this.getParentScope().resolveSymbol(id, transforms, this as unknown as Scope);
  }

  symbolMatches(id: string, all: boolean, _initialScope: Scope): ElanSymbol[] {
    return this.getParentScope().symbolMatches(id, all, this as unknown as Scope);
  }

  debugSymbols() {
    return () => allScopedSymbols(this.getParentScope(), this as unknown as Scope);
  }

  getNextState(currentState: BreakpointStatus, event: BreakpointEvent) {
    switch (currentState) {
      case BreakpointStatus.none:
        switch (event) {
          case BreakpointEvent.clear:
            return BreakpointStatus.none;
          case BreakpointEvent.activate:
            return BreakpointStatus.singlestep;
          case BreakpointEvent.disable:
            return BreakpointStatus.none;
        }
      case BreakpointStatus.disabled:
        switch (event) {
          case BreakpointEvent.clear:
            return BreakpointStatus.none;
          case BreakpointEvent.activate:
            return BreakpointStatus.active;
          case BreakpointEvent.disable:
            return BreakpointStatus.disabled;
        }
      case BreakpointStatus.active:
        switch (event) {
          case BreakpointEvent.clear:
            return BreakpointStatus.none;
          case BreakpointEvent.activate:
            return BreakpointStatus.active;
          case BreakpointEvent.disable:
            return BreakpointStatus.disabled;
        }
      case BreakpointStatus.singlestep:
        switch (event) {
          case BreakpointEvent.clear:
            return BreakpointStatus.none;
          case BreakpointEvent.activate:
            return BreakpointStatus.singlestep;
          case BreakpointEvent.disable:
            return BreakpointStatus.none;
        }
    }
  }

  updateBreakpoints(event: BreakpointEvent): void {
    this.breakpointStatus = this.getNextState(this.breakpointStatus, event);
  }
}
