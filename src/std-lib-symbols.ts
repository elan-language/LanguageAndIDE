import { getSymbol } from "./elan-type-annotations";
import {
  ElanDescriptor,
  elanMetadataKey,
  isClassDescriptor,
  isConstantDescriptor,
  isFunctionDescriptor,
  isProcedureDescriptor,
} from "./elan-type-interfaces";
import { ElanSymbol } from "./frames/interfaces/elan-symbol";
import { Scope } from "./frames/interfaces/scope";
import { NullScope } from "./frames/symbols/null-scope";
import { UnknownSymbol } from "./frames/symbols/unknown-symbol";
import { Transforms } from "./frames/syntax-nodes/transforms";
import { StdLib } from "./std-lib";

export class StdLibSymbols implements Scope {
  constructor() {
    this.loadSymbols();
  }

  private symbols = new Map<string, ElanSymbol>();

  private loadSymbols() {
    const stdlib = new StdLib();

    const names = Object.getOwnPropertyNames(Object.getPrototypeOf(stdlib)).concat(
      Object.getOwnPropertyNames(stdlib),
    );

    for (let i = 0; i < names.length; i++) {
      const name = names[i];

      const metadata = Reflect.getMetadata(elanMetadataKey, stdlib, name) as
        | ElanDescriptor
        | undefined;

      if (isFunctionDescriptor(metadata)) {
        this.symbols.set(name, getSymbol(name, metadata.mapType()));
      }

      if (isProcedureDescriptor(metadata)) {
        this.symbols.set(name, getSymbol(name, metadata.mapType()));
      }

      if (isConstantDescriptor(metadata)) {
        this.symbols.set(name, getSymbol(name, metadata.mapType()));
      }

      if (isClassDescriptor(metadata)) {
        this.symbols.set(name, getSymbol(name, metadata.mapType(this)));
      }
    }
  }

  symbolMatches(id: string, all: boolean): ElanSymbol[] {
    return [...this.symbols.keys()]
      .filter((k) => k.startsWith(id) || all)
      .map((k) => this.symbols.get(k)!);
  }

  getParentScope(): Scope {
    return NullScope.Instance;
  }

  resolveSymbol(id: string | undefined, transforms: Transforms, scope: Scope): ElanSymbol {
    return id ? this.symbols.get(id) ?? new UnknownSymbol(id) : new UnknownSymbol();
  }
}
