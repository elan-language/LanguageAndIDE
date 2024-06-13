import { SymbolType } from "../interfaces/symbol-type";

export class TupleType implements SymbolType {
  constructor(public readonly ofTypes: SymbolType[]) {}

  isImmutable = true;

  initialValue = "";

  get name() {
    return `Tuple <${this.ofTypes.map((t) => t.name).join(", ")}>`;
  }

  toString(): string {
    return `(${this.ofTypes.map((t) => t.name).join(", ")})`;
  }
}
