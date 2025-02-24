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

  isAssignableFrom(_otherType: SymbolType): boolean {
    throw new Error("Method not implemented.");
  }
}
