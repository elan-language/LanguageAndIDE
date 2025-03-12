import { SymbolType } from "../interfaces/symbol-type";

export class BooleanType implements SymbolType {
  private constructor() {}
  isImmutable = true;

  isIndexable = false;
  isDoubleIndexable = false;
  isIterable = false;

  initialValue = "false";

  static Instance: SymbolType = new BooleanType();

  name = "Boolean";

  toString(): string {
    return "Boolean";
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return otherType instanceof BooleanType;
  }
}
