import { ElanSymbol } from "./elan-symbol";

export interface Scope {
  resolveSymbol(id: string, scope: Scope): ElanSymbol;

  getParentScope(): Scope;

  symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[];
}
