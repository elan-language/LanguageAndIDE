import { Language } from "../../ide/frames/frame-interfaces/language";
import { SymbolType } from "../compiler-interfaces/symbol-type";
import { immutableTypeOptions } from "../compiler-interfaces/type-options";
import { AnyExceptEnumName } from "./elan-type-names";
import { EnumType } from "./enum-type";

export class AnyExceptEnumType implements SymbolType {
  private constructor() {}

  languageSpecificName(_language: Language): string {
    return this.name;
  }

  initialValue = "";

  typeOptions = immutableTypeOptions;

  static Instance: SymbolType = new AnyExceptEnumType();

  name = AnyExceptEnumName;

  toString(): string {
    return this.name;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    if (otherType instanceof EnumType) {
      return false;
    }

    return true;
  }
}
