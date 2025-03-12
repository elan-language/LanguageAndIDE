import { SymbolType } from "../interfaces/symbol-type";

export class ProcedureType implements SymbolType {
  constructor(
    public readonly parameterNames: string[],
    public readonly parameterTypes: SymbolType[],
    public readonly isExtension: boolean,
    public readonly isAsync: boolean,
  ) {}

  isImmutable = true;

  isIndexable = false;
  isDoubleIndexable = false;
  isIterable = false;

  initialValue = "";

  get name() {
    return `Procedure (${this.parameterTypes.map((p) => p.name).join(", ")})`;
  }

  toString(): string {
    return `Procedure`;
  }

  isAssignableFrom(_otherType: SymbolType): boolean {
    return true;
  }
}
