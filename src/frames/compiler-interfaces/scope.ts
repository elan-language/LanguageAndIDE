import { Transforms } from "../frame-interfaces/transforms";
import { ElanSymbol } from "./elan-symbol";

export interface Scope {
  resolveSymbol(id: string, transforms: Transforms, scope: Scope): ElanSymbol;

  getParentScope(): Scope;

  symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[];
}
