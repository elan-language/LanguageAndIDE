import { SymbolType } from "../interfaces/symbol-type";

export class UnknownType implements SymbolType {
  private constructor() {}
  initialValue = "";

  isImmutable = true;

  static Instance: SymbolType = new UnknownType();

  name = "Unknown";

  toString(): string {
    return `Unknown`;
  }
}
