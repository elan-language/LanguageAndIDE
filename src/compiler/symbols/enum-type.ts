import { Language } from "../../ide/frames/frame-interfaces/language";
import { SymbolType } from "../compiler-interfaces/symbol-type";
import { immutableTypeOptions } from "../compiler-interfaces/type-options";

export class EnumType implements SymbolType {
  constructor(public readonly name: string) {}

  languageSpecificName(_language: Language): string {
    return this.name;
  }

  typeOptions = immutableTypeOptions;

  get initialValue() {
    return `${this.name}._default`;
  }

  toString() {
    return `Enum ${this.name}`;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    if (otherType instanceof EnumType) {
      return this.name === otherType.name;
    }

    return false;
  }
}
