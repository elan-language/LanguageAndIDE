import { SymbolType } from "../interfaces/symbol-type";

export class BooleanType implements SymbolType {
  private constructor() {}

  static Instance: SymbolType = new BooleanType();

  name = "Boolean";
}
