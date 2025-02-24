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

  isAssignableFrom(_otherType: SymbolType): boolean {
    throw new Error("Method not implemented.");
  }
}
