import { TypeOptions } from "./type-options";

export interface SymbolType {
  name: string;
  initialValue: string;
  isAssignableFrom(otherType: SymbolType): boolean;
  typeOptions: TypeOptions;
}
