import { DeconstructedSymbolType } from "../compiler-interfaces/deconstructed-symbol-type";
import { SymbolType } from "../compiler-interfaces/symbol-type";
import { immutableTypeOptions } from "../compiler-interfaces/type-options";
import { ListImmutableName, ListName } from "./elan-type-names";
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

  get ids() {
    return [this.headdId, this.tailId];
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
      : `${ListImmutableName}<of ${this.headType}> or ${ListName}<of ${this.headType}>`;
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
