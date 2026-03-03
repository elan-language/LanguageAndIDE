import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { SymbolType } from "../../../compiler/compiler-interfaces/symbol-type";
import { symbolMatches } from "../../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../../compiler/symbols/symbol-scope";
import { TupleType } from "../../../compiler/symbols/tuple-type";
import { UnknownSymbol } from "../../../compiler/symbols/unknown-symbol";
import { Property } from "../../compiler-interfaces/property";

export class TupleAsn implements Scope {
  constructor(
    private readonly type: TupleType,
    private readonly scope: Scope,
  ) {}

  parseId(id: string): [boolean, number] {
    if (id.startsWith("item") && id.length >= 5) {
      const index = id.slice(4);
      const i = parseInt(index);
      if (!isNaN(i) && i < this.type.ofTypes.length) {
        return [true, i];
      }
    }

    return [false, 0];
  }

  typeToSymbol(id: string, t: SymbolType): Property {
    return {
      symbolId: id,
      symbolType: () => t,
      symbolScope: SymbolScope.member,
      isProperty: true,
    };
  }

  resolveOwnSymbol(id: string): ElanSymbol {
    const [ok, index] = this.parseId(id);

    if (ok) {
      return this.typeToSymbol(id, this.type.ofTypes[index]);
    }
    return new UnknownSymbol(id);
  }

  resolveSymbol(id: string, caseSensitive: boolean, _initialScope: Scope): ElanSymbol {
    const symbol = this.resolveOwnSymbol(id);

    if (symbol instanceof UnknownSymbol) {
      return this.getParentScope().resolveSymbol(id, caseSensitive, this);
    }

    return symbol;
  }

  getParentScope(): Scope {
    return this.scope;
  }

  symbolMatches(id: string, all: boolean, _initialScope: Scope): ElanSymbol[] {
    const symbols = this.type.ofTypes.map((t, i) => this.typeToSymbol(`item${i}`, t));
    const matches = symbolMatches(id, all, symbols);
    return matches;
  }
}
