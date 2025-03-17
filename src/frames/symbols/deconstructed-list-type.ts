import { DeconstructedSymbolType } from "../interfaces/deconstructed-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";
import { immutableTypeOptions } from "../interfaces/type-options";
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

  typeOptions = immutableTypeOptions;

  private typeMap = {} as { [index: string]: SymbolType };

  get name() {
    return this.tailId
      ? this.tailType.name
      : `List<of ${this.headType}> or Array<of ${this.headType}>`;
  }

  toString(): string {
    return `${this.headdId ? this.headType.name : "_"}:${this.tailId ? this.tailType.name : "_"}`;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    if (this.tailId) {
      return this.tailType.isAssignableFrom(otherType);
    }

    if (isGenericSymbolType(otherType)) {
      return this.headType.isAssignableFrom(otherType.ofTypes[0]);
    }

    return false;
  }
}
