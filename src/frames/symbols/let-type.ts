import { GenericSymbolType } from "../interfaces/generic-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";

export class LetType implements GenericSymbolType {
  constructor(public readonly ofType: SymbolType) {}

  isImmutable = true;

  initialValue = "";

  get name() {
    return `Let <${this.ofType.name}>`;
  }

  isAssignableFrom(_otherType: SymbolType): boolean {
    throw new Error("Method not implemented.");
  }
}
