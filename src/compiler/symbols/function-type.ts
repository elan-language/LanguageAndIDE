import { SymbolType } from "../compiler-interfaces/symbol-type";
import { noTypeOptions } from "../compiler-interfaces/type-options";
import { Deprecated } from "../elan-type-interfaces";
import { FuncName } from "./elan-type-names";

export class FunctionType implements SymbolType {
  constructor(
    public readonly parameterNames: string[],
    public readonly parameterTypes: SymbolType[],
    public readonly returnType: SymbolType,
    public readonly isExtension: boolean,
    public readonly isPure: boolean,
    public readonly isAsync: boolean,
    public readonly deprecated?: Deprecated | undefined,
  ) {}

  get initialValue() {
    return `system.emptyFunc(${this.returnType.initialValue})`;
  }

  // so can have mutable type parameters
  typeOptions = noTypeOptions;

  get name() {
    return `Func<of ${this.parameterTypes.map((p) => p.name).join(", ")} => ${this.returnType.name}>`;
  }

  toString(): string {
    return FuncName;
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
