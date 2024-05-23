import { GenericSymbolType } from "../interfaces/generic-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";

export class ArrayListType implements GenericSymbolType {
  constructor(
    public readonly ofType: SymbolType,
    public readonly is2d: boolean,
  ) {}
  isImmutable = false;

  get name() {
    return `ArrayList <${this.ofType.name}>`;
  }

  toString(): string {
    const twod = this.is2d ? "2D " : "";
    return `${twod}ArrayList<of ${this.ofType.name}>`;
  }
}
