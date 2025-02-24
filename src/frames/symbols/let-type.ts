import { GenericSymbolType } from "../interfaces/generic-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";
import { isAssignableFrom } from "./symbol-helpers";

export class LetType implements GenericSymbolType {
  constructor(public readonly ofType: SymbolType) {}

  isImmutable = true;

  initialValue = "";

  get name() {
    return `Let <${this.ofType.name}>`;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return isAssignableFrom(this, otherType);
  }
}
