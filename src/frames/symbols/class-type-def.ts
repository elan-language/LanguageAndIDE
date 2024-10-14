import { ElanSymbol } from "../interfaces/elan-symbol";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../syntax-nodes/transforms";
import { SymbolScope } from "./symbol-scope";

export class ClassTypeDef implements Scope, ElanSymbol {
  constructor() {}

  symbolId: string = "todo";

  symbolType(transforms?: Transforms): SymbolType {
    throw new Error("Method not implemented.");
  }

  symbolScope: SymbolScope = SymbolScope.program;

  getChildren(): ElanSymbol[] {
    return [];
  }

  resolveOwnSymbol(id: string, transforms: Transforms): ElanSymbol {
    return this;
  }

  resolveSymbol(id: string | undefined, transforms: Transforms, scope: Scope): ElanSymbol {
    throw new Error("Method not implemented.");
  }
  getParentScope(): Scope {
    throw new Error("Method not implemented.");
  }
  symbolMatches(id: string, all: boolean, initialScope?: Scope): ElanSymbol[] {
    throw new Error("Method not implemented.");
  }
}
