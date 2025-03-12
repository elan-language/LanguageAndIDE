import { DeconstructedSymbolType } from "../interfaces/deconstructed-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";
import { TupleType } from "./tuple-type";
import { UnknownType } from "./unknown-type";

export class DeconstructedTupleType implements DeconstructedSymbolType {
  constructor(
    public readonly ids: string[],
    public readonly ofTypes: SymbolType[],
  ) {
    for (let i = 0; i < ids.length; i++) {
      this.typeMap[ids[i]] = ofTypes[i];
    }
  }

  initialValue = "";

  isIndexable = false;
  isDoubleIndexable = false;
  isIterable = false;

  symbolTypeFor(id: string) {
    return this.typeMap[id] ?? UnknownType.Instance;
  }

  isImmutable = true;

  private typeMap = {} as { [index: string]: SymbolType };

  nameOrDiscard(name: string, index: number) {
    return this.ids[index] ? name : "_";
  }

  get name() {
    return `${this.ofTypes.map((t, i) => this.nameOrDiscard(t.name, i)).join(", ")}`;
  }

  toString(): string {
    return this.name;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    if (otherType instanceof TupleType) {
      if (this.ofTypes.length !== otherType.ofTypes.length) {
        return false;
      }

      return this.ofTypes.map((t, i) => t.isAssignableFrom(otherType.ofTypes[i])).every((b) => b);
    }

    return false;
  }
}
