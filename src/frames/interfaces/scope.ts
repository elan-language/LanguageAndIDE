import { ElanSymbol } from "./symbol";
import { Transforms } from "../syntax-nodes/transforms";

export interface Scope {
  resolveSymbol(id: string | undefined, transforms: Transforms, scope: Scope): ElanSymbol;

  getParentScope(): Scope;

  symbolMatches(id: string, all: boolean, initialScope?: Scope): ElanSymbol[];
}
