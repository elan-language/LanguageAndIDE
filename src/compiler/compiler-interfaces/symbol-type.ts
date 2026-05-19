import { Language } from "../../ide/frames/frame-interfaces/language";
import { TypeOptions } from "./type-options";

export interface SymbolType {
  name: string;
  initialValue: string;
  isAssignableFrom(otherType: SymbolType): boolean;
  typeOptions: TypeOptions;
  languageSpecificName(language: Language): string;
}
