import { GenericSymbolType } from "../interfaces/generic-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";

export class ArrayType implements GenericSymbolType {
  constructor(
    public readonly ofType: SymbolType,
    public readonly is2d: boolean,
  ) {}

  get name() {
    return `Array <${this.ofType.name}>`;
  }

  toString(): string {
    const twod = this.is2d ? "2D " : "";
    return `${twod}Array<of ${this.ofType.name}>`;
  }
}
