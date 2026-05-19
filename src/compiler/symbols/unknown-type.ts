import { Language } from "../../ide/frames/frame-interfaces/language";
import { SymbolType } from "../compiler-interfaces/symbol-type";
import { immutableTypeOptions } from "../compiler-interfaces/type-options";

export class UnknownType implements SymbolType {
  private constructor() {}

  languageSpecificName(_language: Language): string {
    return this.name;
  }

  initialValue = "";

  typeOptions = immutableTypeOptions;

  static Instance: SymbolType = new UnknownType();

  name = "Unknown";

  toString(): string {
    return this.name;
  }

  isAssignableFrom(_otherType: SymbolType): boolean {
    return true;
  }
}
