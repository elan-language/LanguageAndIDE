import { ElanSymbol } from "./elan-symbol";
import { Transforms } from "./transforms";

export interface Scope {
  resolveSymbol(id: string, transforms: Transforms, scope: Scope): ElanSymbol;

  getParentScope(): Scope;

  symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[];
}
