import { Deprecated } from "../../elan-type-interfaces";
import { SymbolType } from "../interfaces/symbol-type";
import { immutableTypeOptions } from "../interfaces/type-options";

export class ProcedureType implements SymbolType {
  constructor(
    public readonly parameterNames: string[],
    public readonly parameterTypes: SymbolType[],
    public readonly isExtension: boolean,
    public readonly isAsync: boolean,
    public readonly deprecated?: Deprecated | undefined,
  ) {}

  typeOptions = immutableTypeOptions;

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
