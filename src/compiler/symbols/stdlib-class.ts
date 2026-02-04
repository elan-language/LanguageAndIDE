import { Class } from "../compiler-interfaces/class";
import { ElanSymbol } from "../compiler-interfaces/elan-symbol";
import { Deprecated } from "../compiler-interfaces/elan-type-interfaces";
import { Scope } from "../compiler-interfaces/scope";
import { SymbolType } from "../compiler-interfaces/symbol-type";
import { TypeOptions } from "../compiler-interfaces/type-options";
import { thisKeyword } from "../keywords";
import { generateType } from "../syntax-nodes/ast-helpers";
import { ClassSubType, ClassType } from "./class-type";
import { DuplicateSymbol } from "./duplicate-symbol";
import { isMember, isProperty, isSymbol, symbolMatches } from "./symbol-helpers";
import { SymbolScope } from "./symbol-scope";
import { UnknownSymbol } from "./unknown-symbol";

export class StdLibClass implements Class {
  constructor(
    private readonly name: string,
    public readonly isNotInheritable: boolean,
    public readonly typeOptions: TypeOptions,
    public readonly children: ElanSymbol[],
    public ofTypes: SymbolType[],
    public readonly inheritTypes: SymbolType[],
    private readonly scope: Scope,
    public readonly deprecated: Deprecated | undefined,
  ) {
    this.symbolId = this.name;
  }

  get isAbstract() {
    return this.typeOptions.isAbstract;
  }

  updateOfTypes(ofTypes: SymbolType[]) {
    const newOfTypes: SymbolType[] = [...this.ofTypes];
    const lessOf = newOfTypes.length > ofTypes.length ? ofTypes.length : newOfTypes.length;

    for (let i = 0; i < lessOf; i++) {
      newOfTypes[i] = ofTypes[i];
    }

    return new StdLibClass(
      this.name,
      this.isNotInheritable,
      this.typeOptions,
      this.children,
      newOfTypes,
      this.inheritTypes,
      this.scope,
      this.deprecated,
    );
  }

  getDirectSuperClassesTypeAndName(): [SymbolType, string][] {
    if (this.inheritTypes.length > 0) {
      const typeAndName: [SymbolType, string][] = this.inheritTypes
        .filter((c) => c instanceof ClassType)
        .map((c) => [c, c.className]);

      return typeAndName;
    }

    return [];
  }

  isClass = true;

  symbolId: string;

  symbolType(): SymbolType {
    // temp hack TODO fix
    return new ClassType(
      this.name,
      this.typeOptions.isAbstract ? ClassSubType.abstract : ClassSubType.concrete,
      this.isNotInheritable,
      this.typeOptions,
      this.inheritTypes,
      this,
    );
  }

  symbolScope: SymbolScope = SymbolScope.stdlib;

  getChildren(): ElanSymbol[] {
    return this.children;
  }

  resolveOwnSymbol(id: string): ElanSymbol {
    if (id === thisKeyword) {
      return this;
    }

    const matches = this.getChildren().filter((f) => isSymbol(f) && f.symbolId === id);

    if (matches.length === 1) {
      return matches[0];
    }
    if (matches.length > 1) {
      return new DuplicateSymbol(matches);
    }

    const types = this.inheritTypes.filter((t) => t instanceof ClassType);

    for (const ct of types) {
      const s = ct.scope!.resolveOwnSymbol(id);
      if (isMember(s)) {
        matches.push(s);
      }
    }

    if (matches.length === 1) {
      return matches[0];
    }
    if (matches.length > 1) {
      return new DuplicateSymbol(matches);
    }

    return new UnknownSymbol(id);
  }

  resolveSymbol(id: string, caseSensitive: boolean, _initialScope: Scope): ElanSymbol {
    const symbol = this.resolveOwnSymbol(id);

    if (symbol instanceof UnknownSymbol) {
      return this.getParentScope().resolveSymbol(id, caseSensitive, this);
    }

    if (!isProperty(symbol)) {
      const st = symbol.symbolType();
      const matches = new Map<string, SymbolType>();

      this.ofTypes.forEach((t, i) => matches.set(`T${i + 1}`, t));

      const st1 = generateType(st, matches);
      let reifiedSymbol: ElanSymbol;

      if (isMember(symbol)) {
        reifiedSymbol = {
          symbolId: symbol.symbolId,
          symbolType: () => st1,
          symbolScope: symbol.symbolScope,
          isMember: symbol.isMember,
          private: symbol.private,
          isAbstract: symbol.isAbstract,
          getClass: symbol.getClass,
        } as ElanSymbol;
      } else {
        // should never get here
        reifiedSymbol = {
          symbolId: symbol.symbolId,
          symbolType: () => st1,
          symbolScope: symbol.symbolScope,
        } as ElanSymbol;
      }

      return reifiedSymbol;
    }

    return symbol;
  }

  getParentScope(): Scope {
    return this.scope;
  }

  symbolMatches(id: string, all: boolean, _initialScope: Scope): ElanSymbol[] {
    let otherMatches = this.getParentScope().symbolMatches(id, all, this);

    for (const inherited of this.inheritTypes) {
      if (inherited instanceof ClassType) {
        const m = inherited.symbolMatches(id, all);
        otherMatches = otherMatches.concat(m);
      }
    }

    const symbols = this.getChildren().filter((f) => isSymbol(f));

    const matches = symbolMatches(id, all, symbols);

    return matches.concat(otherMatches);
  }
}
