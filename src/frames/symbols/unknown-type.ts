import { SymbolType } from "../interfaces/symbol-type";

export class UnknownType implements SymbolType {
  private constructor() {}
  initialValue = "";

  isImmutable = true;

  isIndexable = false;
  isDoubleIndexable = false;
  isIterable = false;

  static Instance: SymbolType = new UnknownType();

  name = "Unknown";

  toString(): string {
    return `Unknown`;
  }

  isAssignableFrom(_otherType: SymbolType): boolean {
    return true;
  }
}
