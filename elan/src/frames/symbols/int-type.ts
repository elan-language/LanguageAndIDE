import { SymbolType } from "../interfaces/symbol-type";

export class IntType implements SymbolType {
  private constructor() {}

  static Instance: SymbolType = new IntType();

  name = "Int";

  toString(): string {
    return "Int";
  }
}
