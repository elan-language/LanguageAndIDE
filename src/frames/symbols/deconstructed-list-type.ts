import { DeconstructedSymbolType } from "../interfaces/deconstructed-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";
import { isGenericSymbolType } from "./symbol-helpers";
import { UnknownType } from "./unknown-type";

export class DeconstructedListType implements DeconstructedSymbolType {
  constructor(
    public readonly headdId: string,
    public readonly tailId: string,
    public readonly headType: SymbolType,
    public readonly tailType: SymbolType,
  ) {
    this.typeMap[headdId] = headType;
    this.typeMap[tailId] = tailType;
  }

  initialValue = "";

  symbolTypeFor(id: string) {
    return this.typeMap[id] ?? UnknownType.Instance;
  }

  isImmutable = true;

  private typeMap = {} as { [index: string]: SymbolType };

  get name() {
    return `${this.headdId}:${this.tailId}`;
  }

  toString(): string {
    return `${this.headdId}:${this.tailId}`;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    let ok = true;

    if (isGenericSymbolType(this.tailType)) {
      ok = this.headType.isAssignableFrom(this.tailType.ofType);
    }

    ok = ok && this.tailType.isAssignableFrom(otherType);

    if (isGenericSymbolType(otherType)) {
      ok = ok && this.headType.isAssignableFrom(otherType.ofType);
    }

    return ok;
  }
}
