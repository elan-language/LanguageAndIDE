import { ElanSymbol } from "./symbol";
import { Transforms } from "../syntax-nodes/transforms";
import { Parent } from "./parent";

export interface Scope {
  resolveSymbol(
    id: string | undefined,
    transforms: Transforms,
    scope: Scope,
  ): ElanSymbol;

  getParent() : Parent;
}
