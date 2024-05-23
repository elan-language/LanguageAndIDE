import { SymbolType } from "../interfaces/symbol-type";

export class BooleanType implements SymbolType {
  private constructor() {}
  isImmutable = true;

  static Instance: SymbolType = new BooleanType();

  name = "Boolean";

  toString(): string {
    return "Boolean";
  }
}
