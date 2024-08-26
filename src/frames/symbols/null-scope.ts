import { Scope } from "../interfaces/scope";
import { ElanSymbol } from "../interfaces/symbol";
import { Transforms } from "../syntax-nodes/transforms";
import { UnknownSymbol } from "./unknown-symbol";

export class NullScope implements Scope {
  resolveSymbol(id: string | undefined, transforms: Transforms, scope: Scope): ElanSymbol {
    return new UnknownSymbol();
  }

  getParentScope(): Scope {
    return NullScope.Instance;
  }

  symbolMatches(id: string, all: boolean, initialScope?: Scope): ElanSymbol[] {
    return [];
  }

  static Instance: Scope = new NullScope();
}
