import { ElanSymbol } from "./elan-symbol";

export interface Scope {
  resolveSymbol(id: string, caseSensitive: boolean, initialScope: Scope): ElanSymbol;

  getParentScope(): Scope;

  symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[];
}
