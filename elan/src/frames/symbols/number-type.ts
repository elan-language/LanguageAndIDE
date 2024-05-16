import { SymbolType } from "../interfaces/symbol-type";

export class FloatType implements SymbolType {
  private constructor() {}

  static Instance: SymbolType = new FloatType();
  name = "Float";
}
