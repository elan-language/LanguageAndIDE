import { SymbolType } from "../interfaces/symbol-type";

export class TupleType implements SymbolType {
  constructor(public readonly ofTypes: SymbolType[]) {}

  isImmutable = true;

  get initialValue() {
    const init = this.ofTypes.map((t) => t.initialValue).join(", ");
    return `system.emptyTuple([${init}])`;
  }

  get name() {
    return `Tuple <${this.ofTypes.map((t) => t.name).join(", ")}>`;
  }

  toString(): string {
    return `(${this.ofTypes.map((t) => t.name).join(", ")})`;
  }
}
