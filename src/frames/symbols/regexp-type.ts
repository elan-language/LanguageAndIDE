import { SymbolType } from "../interfaces/symbol-type";

export class RegExpType implements SymbolType {
  private constructor() {}

  initialValue = "system.emptyRegExp()";

  isImmutable = true;

  static Instance: SymbolType = new RegExpType();

  name = "RegExp";

  toString(): string {
    return `RegExp`;
  }

  isAssignableFrom(_otherType: SymbolType): boolean {
    throw new Error("Method not implemented.");
  }
}
