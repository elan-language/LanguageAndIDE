import { Language } from "../../ide/frames/frame-interfaces/language";
import { SymbolType } from "../compiler-interfaces/symbol-type";
import { noTypeOptions } from "../compiler-interfaces/type-options";

export class TupleType implements SymbolType {
  constructor(public readonly ofTypes: SymbolType[]) {}

  languageSpecificName(language: Language): string {
    return `(${this.ofTypes.map((t) => t.languageSpecificName(language)).join(", ")})`;
  }

  typeOptions = noTypeOptions;

  get initialValue() {
    const init = this.ofTypes.map((t) => t.initialValue).join(", ");
    return `system.emptyTuple([${init}])`;
  }

  get name() {
    return `(${this.ofTypes.map((t) => t.name).join(", ")})`;
  }

  toString(): string {
    return `(${this.ofTypes.map((t) => t.name).join(", ")})`;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    if (otherType instanceof TupleType) {
      if (this.ofTypes.length !== otherType.ofTypes.length) {
        return false;
      }

      return this.ofTypes.map((t, i) => t.isAssignableFrom(otherType.ofTypes[i])).every((b) => b);
    }

    return false;
  }
}
