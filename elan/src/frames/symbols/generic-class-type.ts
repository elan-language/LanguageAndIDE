import { GenericSymbolType } from "../interfaces/generic-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";

export class GenericClassType implements GenericSymbolType {
  constructor(
    private className: string,
    public ofType: SymbolType,
  ) {}

  get name() {
    return `Class ${this.className}<${this.ofType.name}>`;
  }
}
