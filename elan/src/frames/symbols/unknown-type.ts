import { SymbolType } from "../interfaces/symbol-type";

export class UnknownType implements SymbolType {
  private constructor() {}

  static Instance: SymbolType = new UnknownType();

  name = "Unknown";
}
