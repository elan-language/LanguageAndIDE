import { SymbolType } from "../interfaces/symbol-type";

export class FunctionType implements SymbolType {
  constructor(
    public readonly parameterNames: string[],
    public readonly parameterTypes: SymbolType[],
    public readonly returnType: SymbolType,
    public readonly isExtension: boolean,
    public readonly isPure: boolean = true,
    public readonly isAsync: boolean = false,
  ) {
    if (parameterNames.length !== parameterTypes.length) {
      const a = 0;
    }
  }
  get initialValue() {
    return `system.emptyFunc(${this.returnType.initialValue})`;
  }

  isImmutable = true;

  get name() {
    return `Func<of ${this.parameterTypes.map((p) => p.name).join(", ")} => ${this.returnType.name}>`;
  }

  toString(): string {
    return "Func";
  }
}
