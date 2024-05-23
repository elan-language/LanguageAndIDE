import { SymbolType } from "../interfaces/symbol-type";

export class ProcedureType implements SymbolType {
  constructor(public readonly parametersTypes: SymbolType[]) {}

  isImmutable = true;

  get name() {
    return `Procedure (${this.parametersTypes.map((p) => p.name).join(", ")})`;
  }

  toString(): string {
    return `Procedure`;
  }
}
