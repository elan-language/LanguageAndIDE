import { ElanSymbol } from "./elan-symbol";

export interface GlobalConstant extends ElanSymbol {
  isGlobalConstant: boolean;
}
