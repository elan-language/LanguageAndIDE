import { Language } from "../../ide/frames/frame-interfaces/language";
import { Deprecated } from "../compiler-interfaces/elan-type-interfaces";
import { SymbolType } from "../compiler-interfaces/symbol-type";
import { noTypeOptions } from "../compiler-interfaces/type-options";
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

  languageSpecificName(language: Language): string {
    return `Func${language.START_OF_GENERIC}${this.parameterTypes.map((p) => p.name).join(", ")} => ${this.returnType.name}${language.END_OF_GENERIC}`;
  }

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
