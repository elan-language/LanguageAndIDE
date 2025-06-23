import { Deprecated } from "../../elan-type-interfaces";
import { ClassSymbol } from "./class-symbol";
import { ElanSymbol } from "./elan-symbol";
import { Scope } from "./scope";
import { SymbolType } from "./symbol-type";
import { Transforms } from "./transforms";

export interface Class extends Scope, ClassSymbol {
  getChildren(): ElanSymbol[];
  resolveOwnSymbol(id: string, transforms: Transforms): ElanSymbol;
  ofTypes: SymbolType[];
  getDirectSuperClassesTypeAndName(transforms: Transforms): [SymbolType, string][];
  updateOfTypes(ofTypes: SymbolType[]): Class;
  deprecated: Deprecated | undefined;
  isClass: boolean;
}
