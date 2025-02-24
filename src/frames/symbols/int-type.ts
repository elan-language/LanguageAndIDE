import { SymbolType } from "../interfaces/symbol-type";

export class IntType implements SymbolType {
  private constructor() {}
  initialValue = "0";

  isImmutable = true;

  static Instance: SymbolType = new IntType();

  name = "Int";

  toString(): string {
    return "Int";
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return otherType instanceof IntType;
  }
}
