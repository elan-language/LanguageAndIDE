import { SymbolType } from "../compiler-interfaces/symbol-type";
import { noTypeOptions } from "../compiler-interfaces/type-options";
import { FuncName } from "./elan-type-names";

export class TestType implements SymbolType {
  constructor(public readonly name: string) {}

  get initialValue() {
    return "";
  }

  typeOptions = noTypeOptions;

  toString(): string {
    return FuncName;
  }

  isAssignableFrom(_otherType: SymbolType): boolean {
    return false;
  }
}
