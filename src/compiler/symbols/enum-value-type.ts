import { Language } from "../../ide/frames/frame-interfaces/language";
import { SymbolType } from "../compiler-interfaces/symbol-type";
import { immutableTypeOptions } from "../compiler-interfaces/type-options";

export class EnumValueType implements SymbolType {
  constructor(
    public readonly owner: string,
    public readonly name: string,
  ) {}

  languageSpecificName(_language: Language): string {
    return this.name;
  }

  typeOptions = immutableTypeOptions;

  initialValue = "";

  toString() {
    return `${this.owner}.${this.name}`;
  }

  isAssignableFrom(_otherType: SymbolType): boolean {
    return false;
  }
}
