import { GenericSymbolType } from "../interfaces/generic-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";

export class LetType implements GenericSymbolType {
  constructor(public readonly ofType: SymbolType) {}

  get name() {
    return `Let <${this.ofType.name}>`;
  }
}
