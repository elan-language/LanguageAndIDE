import { SymbolType } from "../interfaces/symbol-type";
import { isAssignableFrom } from "./symbol-helpers";

export class UnknownType implements SymbolType {
  private constructor() {}
  initialValue = "";

  isImmutable = true;

  static Instance: SymbolType = new UnknownType();

  name = "Unknown";

  toString(): string {
    return `Unknown`;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return isAssignableFrom(this, otherType);
  }
}
