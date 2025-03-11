import { Class } from "../interfaces/class";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../interfaces/transforms";
import { constructorKeyword, thisKeyword } from "../keywords";
import { generateType } from "../syntax-nodes/ast-helpers";
import { ClassSubType, ClassType } from "./class-type";
import { DuplicateSymbol } from "./duplicate-symbol";
import { isProperty, isSymbol, symbolMatches } from "./symbol-helpers";
import { SymbolScope } from "./symbol-scope";
import { UnknownSymbol } from "./unknown-symbol";

export class StdLibClass implements Class {
  constructor(
    private readonly name: string,
    public readonly isAbstract: boolean,
    public readonly isNotInheritable: boolean,
    public readonly isImmutable: boolean,
    public readonly isIndexable: boolean,
    public readonly isDoubleIndexable: boolean,
    public readonly children: ElanSymbol[],
    public ofTypes: SymbolType[],
    public readonly inheritTypes: SymbolType[],
    private readonly scope: Scope,
  ) {
    this.symbolId = this.name;
  }

  updateOfTypes(ofTypes: SymbolType[]) {
    return new StdLibClass(
      this.name,
      this.isAbstract,
      this.isNotInheritable,
      this.isImmutable,
      this.isIndexable,
      this.isDoubleIndexable,
      this.children,
      ofTypes,
      this.inheritTypes,
      this.scope,
    );
  }

  getDirectSuperClassesTypeAndName(): [SymbolType, string][] {
    return [];
  }

  isClass = true;

  symbolId: string;

  symbolType(_transforms?: Transforms): SymbolType {
    // temp hack TODO fix
    return new ClassType(
      this.name,
      this.isAbstract ? ClassSubType.abstract : ClassSubType.concrete,
      this.isNotInheritable,
      this.isImmutable,
      this.isIndexable,
      this.isDoubleIndexable,
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

  resolveSymbol(id: string, transforms: Transforms, _scope: Scope): ElanSymbol {
    const symbol = this.resolveOwnSymbol(id, transforms);

    if (symbol instanceof UnknownSymbol) {
      return this.getParentScope().resolveSymbol(id, transforms, this);
    }

    if (!isProperty(symbol)) {
      const st = symbol.symbolType();
      const matches = new Map<string, SymbolType>();
      matches.set("T1", this.ofTypes[0]);

      const st1 = generateType(st, matches);

      const newSymbol = {
        symbolId: symbol.symbolId,
        symbolType: () => st1,
        symbolScope: symbol.symbolScope,
      } as ElanSymbol;

      if ("isMember" in symbol) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (newSymbol as any)["isMember"] = true;
      }

      if ("isProperty" in symbol) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (newSymbol as any)["isProperty"] = true;
      }

      return newSymbol;
    }

    return symbol;
  }

  getParentScope(): Scope {
    return this.scope;
  }

  symbolMatches(id: string, all: boolean, _initialScope: Scope): ElanSymbol[] {
    const otherMatches = this.getParentScope().symbolMatches(id, all, this);

    const symbols = this.getChildren().filter(
      (f) => f.symbolId !== constructorKeyword && isSymbol(f),
    ) as ElanSymbol[];

    const matches = symbolMatches(id, all, symbols);

    return matches.concat(otherMatches);
  }
}
