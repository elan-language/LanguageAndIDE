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
}
