import { SymbolType } from "../interfaces/symbol-type";

export class FunctionType implements SymbolType {
  constructor(
    public readonly parametersTypes: SymbolType[],
    public readonly returnType: SymbolType,
    public readonly isExtension: boolean,
    public readonly isPure: boolean = true,
  ) {}

  get name() {
    return `Function (${this.parametersTypes.map((p) => p.name).join(", ")}) : ${this.returnType.name}`;
  }

  toString(): string {
    return "Function";
  }
}
