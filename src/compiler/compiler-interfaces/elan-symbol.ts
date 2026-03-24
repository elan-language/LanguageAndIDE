import { Language } from "../../ide/frames/frame-interfaces/language";
import { SymbolScope } from "../symbols/symbol-scope";
import { SymbolType } from "./symbol-type";

export interface ElanSymbol {
  symbolId: string;
  symbolType(): SymbolType;
  symbolScope: SymbolScope;
  symbolIsType: boolean;
}

export interface ElanSymbolByLanguage extends ElanSymbol {
  toLanguage(l: Language): ElanSymbol;
}
