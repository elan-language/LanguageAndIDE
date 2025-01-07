import { Class } from "../interfaces/class";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { constructorKeyword, thisKeyword } from "../keywords";
import { Transforms } from "../syntax-nodes/transforms";
import { ClassType } from "./class-type";
import { DuplicateSymbol } from "./duplicate-symbol";
import { isSymbol, symbolMatches } from "./symbol-helpers";
import { SymbolScope } from "./symbol-scope";
import { UnknownSymbol } from "./unknown-symbol";

export class StdLibClass implements Class {
  constructor(
    private readonly name: string,
    public readonly isAbstract: boolean,
    public readonly isNotInheritable: boolean,
    public readonly immutable: boolean,
    public readonly children: ElanSymbol[],
    public readonly ofTypes: SymbolType[],
    public readonly inheritTypes: SymbolType[],
    private readonly scope: Scope,
  ) {
    this.symbolId = this.name;
  }
  getSuperClassesTypeAndName(): [SymbolType, string][] {
    return [];
  }

  genericParamMatches: Map<string, SymbolType> = new Map<string, SymbolType>();

  isClass = true;

  symbolId: string;

  isImmutable() {
    return this.immutable;
  }

  symbolType(_transforms?: Transforms): SymbolType {
    return new ClassType(
      this.name,
      this.isAbstract,
      this.isNotInheritable,
      this.immutable,
      this.inheritTypes,
      this,
    );
  }

  symbolScope: SymbolScope = SymbolScope.stdlib;

  getChildren(): ElanSymbol[] {
    return this.children;
  }

  resolveOwnSymbol(id: string, _transforms: Transforms): ElanSymbol {
    if (id === thisKeyword) {
      return this;
    }

    if (id === constructorKeyword) {
      return (
        this.getChildren().find((c) => c.symbolId === constructorKeyword) ?? new UnknownSymbol(id)
      );
    }

    const matches = this.getChildren().filter(
      (f) => isSymbol(f) && f.symbolId === id,
    ) as ElanSymbol[];

    if (matches.length === 1) {
      return matches[0];
    }
    if (matches.length > 1) {
      return new DuplicateSymbol(matches);
    }

    return new UnknownSymbol(id);
  }

  resolveSymbol(id: string | undefined, transforms: Transforms, _scope: Scope): ElanSymbol {
    const symbol = this.resolveOwnSymbol(id!, transforms);

    if (symbol instanceof UnknownSymbol) {
      return this.getParentScope().resolveSymbol(id, transforms, this);
    }

    return symbol;
  }

  getParentScope(): Scope {
    return this.scope;
  }

  symbolMatches(id: string, all: boolean, _initialScope?: Scope): ElanSymbol[] {
    const otherMatches = this.getParentScope().symbolMatches(id, all, this);

    const symbols = this.getChildren().filter(
      (f) => f.symbolId !== constructorKeyword && isSymbol(f),
    ) as ElanSymbol[];

    const matches = symbolMatches(id, all, symbols);

    return matches.concat(otherMatches);
  }
}
