import { SymbolType } from "../interfaces/symbol-type";

export class BooleanType implements SymbolType {
  private constructor() {}
  isImmutable = true;

  initialValue = "false";

  static Instance: SymbolType = new BooleanType();

  name = "Boolean";

  toString(): string {
    return "Boolean";
  }

  isAssignableFrom(_otherType: SymbolType): boolean {
    throw new Error("Method not implemented.");
  }
}
