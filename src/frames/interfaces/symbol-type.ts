import { ClassOptions } from "./type-options";

export interface SymbolType {
  name: string;
  initialValue: string;
  isAssignableFrom(otherType: SymbolType): boolean;
  classOptions : ClassOptions;
}
