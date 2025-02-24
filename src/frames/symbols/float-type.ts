import { SymbolType } from "../interfaces/symbol-type";

export class FloatType implements SymbolType {
  private constructor() {}
  initialValue = "0";

  isImmutable = true;

  static Instance: SymbolType = new FloatType();
  name = "Float";

  toString(): string {
    return `Float`;
  }

  isAssignableFrom(_otherType: SymbolType): boolean {
    throw new Error("Method not implemented.");
  }
}
