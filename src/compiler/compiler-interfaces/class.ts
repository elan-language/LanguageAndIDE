import { ClassSymbol } from "./class-symbol";
import { ElanSymbol } from "./elan-symbol";
import { Deprecated } from "./elan-type-interfaces";
import { Scope } from "./scope";
import { SymbolType } from "./symbol-type";

export interface Class extends Scope, ClassSymbol {
  getChildren(): ElanSymbol[];
  resolveOwnSymbol(id: string): ElanSymbol;
  ofTypes: SymbolType[];
  getDirectSuperClassesTypeAndName(): [SymbolType, string][];
  updateOfTypes(ofTypes: SymbolType[]): Class;
  deprecated: Deprecated | undefined;
  isClass: boolean;
}
