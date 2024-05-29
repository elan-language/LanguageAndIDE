import { SymbolType } from "../interfaces/symbol-type";
import { UnknownType } from "./unknown-type";

export class DeconstructedTupleType implements SymbolType {
  constructor(public readonly ids : string[], public readonly ofTypes: SymbolType[]) {
    for (let i = 0; i < ids.length ; i++) {
      this.typeMap[ids[i]] = ofTypes[i]; 
    }
  }

  symbolTypeFor(id : string) {
    return this.typeMap[id] ?? UnknownType.Instance;
  }

  isImmutable = true;

  private typeMap = {} as {[index  : string] : SymbolType};

  get name() {
    return `DeconstructedTuple <${this.ofTypes.map((t) => t.name).join(", ")}>`;
  }

  toString(): string {
    return `(${this.ofTypes.map((t) => t.name).join(", ")})`;
  }
}
