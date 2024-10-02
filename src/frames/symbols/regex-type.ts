import { SymbolType } from "../interfaces/symbol-type";

export class RegexType implements SymbolType {
  private constructor() {}

  initialValue = "system.emptyRegex()";

  isImmutable = true;

  static Instance: SymbolType = new RegexType();

  name = "Regex";

  toString(): string {
    return `Regex`;
  }
}
