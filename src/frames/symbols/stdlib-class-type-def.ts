import { ClassTypeDef } from "../interfaces/class-type-def";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { constructorKeyword, thisKeyword } from "../keywords";
import { Transforms } from "../syntax-nodes/transforms";
import { ClassType } from "./class-type";
import { DuplicateSymbol } from "./duplicate-symbol";
import { isSymbol } from "./symbol-helpers";
import { SymbolScope } from "./symbol-scope";
import { UnknownSymbol } from "./unknown-symbol";

export class StdLibClassTypeDef implements ClassTypeDef {
  constructor(
    private readonly name: string,
    public readonly isAbstract: boolean,
    public readonly children: ElanSymbol[],
    public readonly ofTypes: SymbolType[],
    private readonly scope: Scope,
  ) {
    this.symbolId = this.name;
  }

  gpMap?: Map<string, SymbolType>;

  isClass = true;

  symbolId: string;

  symbolType(transforms?: Transforms): SymbolType {
    return new ClassType(this.name, this.isAbstract, false, [], this);
  }

  symbolScope: SymbolScope = SymbolScope.stdlib;

  getChildren(): ElanSymbol[] {
    return this.children;
  }

  resolveOwnSymbol(id: string, transforms: Transforms): ElanSymbol {
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

  resolveSymbol(id: string | undefined, transforms: Transforms, scope: Scope): ElanSymbol {
    const symbol = this.resolveOwnSymbol(id!, transforms);

    if (symbol instanceof UnknownSymbol) {
      return this.getParentScope().resolveSymbol(id, transforms, this);
    }

    return symbol;
  }

  getParentScope(): Scope {
    return this.scope;
  }

  symbolMatches(id: string, all: boolean, initialScope?: Scope): ElanSymbol[] {
    const otherMatches = this.getParentScope().symbolMatches(id, all, this);

    const matches = this.getChildren().filter(
      (f) => f.symbolId !== constructorKeyword && isSymbol(f) && (f.symbolId.startsWith(id) || all),
    ) as ElanSymbol[];

    return matches.concat(otherMatches);
  }
}
