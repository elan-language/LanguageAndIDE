import { ElanSymbol } from "./elan-symbol";

export interface Definition extends ElanSymbol {
  isLet(): boolean;
  isVariable(): boolean;
}
