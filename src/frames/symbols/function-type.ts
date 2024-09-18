import { SymbolType } from "../interfaces/symbol-type";

export class FunctionType implements SymbolType {
  constructor(
    public readonly parametersTypes: SymbolType[],
    public readonly returnType: SymbolType,
    public readonly isExtension: boolean,
    public readonly isPure: boolean = true,
    public readonly isAsync: boolean = false,
  ) {}
  get initialValue() {
    return `system.emptyFunc(${this.returnType.initialValue})`;
  }

  isImmutable = true;

  get name() {
    return `Func<of ${this.parametersTypes.map((p) => p.name).join(", ")} => ${this.returnType.name}>`;
  }

  toString(): string {
    return "Function";
  }
}
