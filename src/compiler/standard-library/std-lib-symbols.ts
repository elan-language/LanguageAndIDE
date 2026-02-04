import { ElanSymbol } from "../compiler-interfaces/elan-symbol";
import {
  ElanDescriptor,
  elanMetadataKey,
  isClassDescriptor,
  isConstantDescriptor,
  isFunctionDescriptor,
  isProcedureDescriptor,
} from "../compiler-interfaces/elan-type-interfaces";
import { Scope } from "../compiler-interfaces/scope";
import { SymbolType } from "../compiler-interfaces/symbol-type";
import { getConstantSymbol, getSymbol } from "../elan-type-annotations";
import { NullScope } from "../symbols/null-scope";
import { symbolMatches } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { UnknownSymbol } from "../symbols/unknown-symbol";

export class StdLibSymbols implements Scope {
  constructor(stdlib: object) {
    try {
      this.loadSymbols(stdlib);
      this.isInitialised = true;
    } catch (e) {
      this.isInitialised = false;
      this.error = (e as { message: string }).message;
    }
  }

  isInitialised: boolean = false;
  error: string = "";

  private symbols = new Map<string, ElanSymbol>();

  private loadSymbols(stdlib: object) {
    const names = Object.getOwnPropertyNames(Object.getPrototypeOf(stdlib)).concat(
      Object.getOwnPropertyNames(stdlib),
    );

    for (let i = 0; i < names.length; i++) {
      const name = names[i];

      const metadata = Reflect.getMetadata(elanMetadataKey, stdlib, name) as
        | ElanDescriptor
        | undefined;

      if (isFunctionDescriptor(metadata)) {
        this.symbols.set(name, getSymbol(name, metadata.mapType(this), SymbolScope.stdlib));
      }

      if (isProcedureDescriptor(metadata)) {
        this.symbols.set(name, getSymbol(name, metadata.mapType(this), SymbolScope.stdlib));
      }

      if (isConstantDescriptor(metadata)) {
        this.symbols.set(name, getConstantSymbol(name, metadata.mapType(this), SymbolScope.stdlib));
      }

      if (isClassDescriptor(metadata)) {
        this.symbols.set(name, getSymbol(name, metadata.mapType(this), SymbolScope.stdlib));
      }
    }
  }

  isDeprecated(s: SymbolType): boolean {
    return "deprecated" in s && !!s.deprecated;
  }

  symbolMatches(id: string, all: boolean): ElanSymbol[] {
    return symbolMatches(id, all, [...this.symbols.values()]).filter(
      (s) => !this.isDeprecated(s.symbolType()),
    );
  }

  getParentScope(): Scope {
    return NullScope.Instance;
  }

  resolveSymbol(id: string, _caseSensitive: boolean, _initialScope: Scope): ElanSymbol {
    return id ? (this.symbols.get(id) ?? new UnknownSymbol(id)) : new UnknownSymbol();
  }
}
