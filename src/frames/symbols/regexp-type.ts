import { SymbolType } from "../interfaces/symbol-type";
import { isAssignableFrom } from "./symbol-helpers";

export class RegExpType implements SymbolType {
  private constructor() {}

  initialValue = "system.emptyRegExp()";

  isImmutable = true;

  static Instance: SymbolType = new RegExpType();

  name = "RegExp";

  toString(): string {
    return `RegExp`;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return isAssignableFrom(this, otherType);
  }
}
