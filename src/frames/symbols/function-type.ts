import { SymbolType } from "../interfaces/symbol-type";
import { immutableTypeOptions } from "../interfaces/type-options";

export class FunctionType implements SymbolType {
  constructor(
    public readonly parameterNames: string[],
    public readonly parameterTypes: SymbolType[],
    public readonly returnType: SymbolType,
    public readonly isExtension: boolean,
    public readonly isPure: boolean,
    public readonly isAsync: boolean,
  ) {}

  get initialValue() {
    return `system.emptyFunc(${this.returnType.initialValue})`;
  }

  typeOptions = immutableTypeOptions;

  get name() {
    return `Func<of ${this.parameterTypes.map((p) => p.name).join(", ")} => ${this.returnType.name}>`;
  }

  toString(): string {
    return "Func";
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    if (otherType instanceof FunctionType) {
      if (this.parameterTypes.length !== otherType.parameterTypes.length) {
        return false;
      }

      const rt = this.returnType.isAssignableFrom(otherType.returnType);

      return (
        rt &&
        this.parameterTypes
          .map((t, i) => t.isAssignableFrom(otherType.parameterTypes[i]))
          .every((b) => b)
      );
    }

    return false;
  }
}
