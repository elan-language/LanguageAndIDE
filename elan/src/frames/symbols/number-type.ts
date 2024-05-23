import { SymbolType } from "../interfaces/symbol-type";

export class FloatType implements SymbolType {
  private constructor() {}

  isImmutable = true;

  static Instance: SymbolType = new FloatType();
  name = "Float";

  toString(): string {
    return `Float`;
  }
}
