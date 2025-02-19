import { ElanSymbol } from "../interfaces/elan-symbol";
import { Scope } from "../interfaces/scope";
import { Transforms } from "../syntax-nodes/transforms";
import { UnknownSymbol } from "./unknown-symbol";

export class NullScope implements Scope {
  resolveSymbol(_id: string, _transforms: Transforms, _scope: Scope): ElanSymbol {
    return new UnknownSymbol();
  }

  getParentScope(): Scope {
    return NullScope.Instance;
  }

  symbolMatches(_id: string, _all: boolean, _initialScope?: Scope): ElanSymbol[] {
    return [];
  }

  static Instance: Scope = new NullScope();
}
