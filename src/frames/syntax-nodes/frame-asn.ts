import { getId } from "../compile-rules";
import { AstNode } from "../compiler-interfaces/ast-node";
import { ElanSymbol } from "../compiler-interfaces/elan-symbol";
import { Scope } from "../compiler-interfaces/scope";
import { SymbolType } from "../compiler-interfaces/symbol-type";
import { singleIndent } from "../frame-helpers";
import { BreakpointEvent, BreakpointStatus } from "../status-enums";
import { ClassType } from "../symbols/class-type";
import { allScopedSymbols, getGlobalScope, orderSymbol } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { PropertyAsn } from "./class-members/property-asn";

export class FrameAsn extends AbstractAstNode implements AstNode, Scope {
  constructor(
    public readonly fieldId: string,
    protected readonly scope: Scope,
  ) {
    super();
    getGlobalScope(scope).setScopeById(fieldId, this);
  }

  compile(): string {
    throw new Error("Method not implemented.");
  }

  breakpointStatus: BreakpointStatus = BreakpointStatus.none;

  setBreakPoint = () => {
    this.breakpointStatus = BreakpointStatus.active;
  };

  clearBreakPoint = () => {
    this.breakpointStatus = BreakpointStatus.none;
  };

  toggleBreakPoint = () => {
    if (this.hasBreakpoint()) {
      this.clearBreakPoint();
    } else {
      this.setBreakPoint();
    }
  };

  clearAllBreakPoints = () => {
    getGlobalScope(this.scope).updateBreakpoints(BreakpointEvent.clear);
  };

  hasBreakpoint() {
    return (
      this.breakpointStatus === BreakpointStatus.active ||
      this.breakpointStatus === BreakpointStatus.disabled
    );
  }

  protected paused = false;

  symbolType(): SymbolType {
    return UnknownType.Instance;
  }

  compileScope: Scope | undefined;

  setCompileScope(s: Scope): void {
    this.compileScope = s;
  }

  getParentScope(): Scope {
    return this.compileScope ?? this.scope;
  }

  getCurrentScope(): Scope {
    return this;
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

  getClassTypeMap(type: SymbolType) {
    if (type instanceof ClassType && type.typeOptions.isIndexable) {
      const ofTypes = type.ofTypes;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const typeDict: { [index: string]: any } = { Type: type.name };

      for (const s of ofTypes) {
        typeDict["OfTypes"] = this.getClassTypeMap(s);
      }

      return typeDict;
    } else if (type instanceof ClassType && !type.typeOptions.isIndexable) {
      const childSymbols = type.childSymbols().filter((s) => s instanceof PropertyAsn);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const typeDict: { [index: string]: any } = { Type: type.name };
      typeDict["Properties"] = {};

      for (const s of childSymbols) {
        typeDict["Properties"][getId(s.name)] = this.getClassTypeMap(s.symbolType());
      }

      return typeDict;
    } else {
      return { Type: type.name };
    }
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
      const type = symbol.symbolType();
      const fullType = type.name;
      const typeMap = JSON.stringify(this.getClassTypeMap(type));

      resolveId.push(
        `${indent}_scopedIds${this.fieldId}.push(await system.debugSymbol("${fullType}", "${id}", ${value}, '${typeMap}'));`,
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

  resolveSymbol(id: string, _initialScope: Scope): ElanSymbol {
    return this.getParentScope().resolveSymbol(id, this);
  }

  symbolMatches(id: string, all: boolean, _initialScope: Scope): ElanSymbol[] {
    return this.getParentScope().symbolMatches(id, all, this);
  }

  debugSymbols() {
    return () => allScopedSymbols(this.getParentScope(), this);
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
