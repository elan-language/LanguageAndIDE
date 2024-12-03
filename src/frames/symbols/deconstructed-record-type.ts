import { Class } from "../interfaces/class";
import { DeconstructedSymbolType } from "../interfaces/deconstructed-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";
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

  symbolTypeFor(id: string) {
    return this.typeMap[id] ?? UnknownType.Instance;
  }

  isImmutable = true;

  private typeMap = {} as { [index: string]: SymbolType };

  get name() {
    return `DeconstructedRecord<of ${this.record}>`;
  }

  toString(): string {
    return `( ${this.record})`;
  }
}