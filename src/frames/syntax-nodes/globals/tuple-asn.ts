import { ElanSymbol } from "../../compiler-interfaces/elan-symbol";
import { Scope } from "../../compiler-interfaces/scope";
import { SymbolScope } from "../../symbols/symbol-scope";
import { TupleType } from "../../symbols/tuple-type";
import { UnknownSymbol } from "../../symbols/unknown-symbol";

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

  resolveOwnSymbol(id: string): ElanSymbol {
    const [ok, index] = this.parseId(id);

    if (ok) {
      return {
        symbolId: id,
        symbolType: () => this.type.ofTypes[index],
        symbolScope: SymbolScope.member,
      };
    }
    return new UnknownSymbol(id);
  }

  resolveSymbol(_id: string, _scope: Scope): ElanSymbol {
    throw new Error("Method not implemented.");
  }

  getParentScope(): Scope {
    return this.scope;
  }

  symbolMatches(_id: string, _all: boolean, _initialScope: Scope): ElanSymbol[] {
    throw new Error("Method not implemented.");
  }
}
