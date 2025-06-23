import { Class } from "../compiler-interfaces/class";
import { DeconstructedSymbolType } from "../compiler-interfaces/deconstructed-symbol-type";
import { SymbolType } from "../compiler-interfaces/symbol-type";
import { immutableTypeOptions } from "../frame-interfaces/type-options";
import { UnknownType } from "./unknown-type";

export class DeconstructedRecordType implements DeconstructedSymbolType {
  constructor(
    public readonly ids: string[],
    public readonly record: Class,
  ) {
    for (const id of ids) {
      // fix !
      this.typeMap[id] = record.resolveOwnSymbol(id, undefined!).symbolType();
    }
  }

  initialValue = "";

  typeOptions = immutableTypeOptions;

  symbolTypeFor(id: string) {
    return this.typeMap[id] ?? UnknownType.Instance;
  }

  private typeMap = {} as { [index: string]: SymbolType };

  get name() {
    return `DeconstructedRecord<of ${this.record}>`;
  }

  toString(): string {
    return `( ${this.record})`;
  }

  isAssignableFrom(_otherType: SymbolType): boolean {
    return false;
  }
}
