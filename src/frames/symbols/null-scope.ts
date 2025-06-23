import { ElanSymbol } from "../compiler-interfaces/elan-symbol";
import { Scope } from "../compiler-interfaces/scope";
import { Transforms } from "../frame-interfaces/transforms";
import { SymbolScope } from "./symbol-scope";
import { UnknownSymbol } from "./unknown-symbol";
import { UnknownType } from "./unknown-type";

export class NullScope implements Scope {
  resolveSymbol(_id: string, _transforms: Transforms, _scope: Scope): ElanSymbol {
    return new UnknownSymbol();
  }

  resolveOwnSymbol(_id: string, _transforms: Transforms): ElanSymbol {
    return new UnknownSymbol();
  }

  getParentScope(): Scope {
    return NullScope.Instance;
  }

  symbolMatches(_id: string, _all: boolean, _initialScope: Scope): ElanSymbol[] {
    return [];
  }

  getChildren(): ElanSymbol[] {
    return [];
  }

  symbolId = "";
  symbolType = () => UnknownType.Instance;
  symbolScope = SymbolScope.unknown;

  static Instance: Scope = new NullScope();
}
