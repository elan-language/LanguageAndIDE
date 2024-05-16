import { SymbolType } from "../interfaces/symbol-type";

export class TupleType implements SymbolType {
  constructor(public readonly ofTypes: SymbolType[]) {}

  get name() {
    return `Tuple <${this.ofTypes.map((t) => t.name).join(", ")}>`;
  }
}
