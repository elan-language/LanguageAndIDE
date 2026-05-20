import { Language } from "../../ide/frames/frame-interfaces/language";
import { SymbolType } from "../compiler-interfaces/symbol-type";
import { immutableTypeOptions } from "../compiler-interfaces/type-options";
import { BooleanName } from "./elan-type-names";

export class BooleanType implements SymbolType {
  private constructor() {}

  languageSpecificName(language: Language): string {
    return language.BOOL_NAME;
  }

  typeOptions = immutableTypeOptions;

  initialValue = "false";

  static Instance: SymbolType = new BooleanType();

  name = BooleanName;

  toString(): string {
    return this.name;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return otherType instanceof BooleanType;
  }
}
