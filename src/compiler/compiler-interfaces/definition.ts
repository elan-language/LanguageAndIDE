import { ElanSymbol } from "./elan-symbol";

export interface Definition extends ElanSymbol {
  isLocalConstant(): boolean;
  isVariable(): boolean;
}
