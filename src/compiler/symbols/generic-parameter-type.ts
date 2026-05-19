import { Language } from "../../ide/frames/frame-interfaces/language";
import { SymbolType } from "../compiler-interfaces/symbol-type";
import { noTypeOptions } from "../compiler-interfaces/type-options";

export class GenericParameterType implements SymbolType {
  constructor(
    public id: string,
    public constraint?: SymbolType,
  ) {}

  languageSpecificName(_language: Language): string {
    return this.name;
  }

  typeOptions = noTypeOptions;

  initialValue = "";

  get name() {
    return this.constraint ? `${this.constraint.name}` : `Generic Parameter ${this.id}`;
  }

  toString() {
    return this.name;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    if (otherType instanceof GenericParameterType) {
      return this.name === otherType.name;
    }
    return false;
  }
}
