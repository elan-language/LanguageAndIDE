import { ElanSymbol } from "./elan-symbol";

export interface Constant extends ElanSymbol {
  isConstant: boolean;
}
