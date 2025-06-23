import { GenericSymbolType } from "../frame-interfaces/generic-symbol-type";
import { SymbolType } from "../frame-interfaces/symbol-type";
import { StringName } from "./elan-type-names";

export class StringType implements GenericSymbolType {
  private constructor() {}

  get ofTypes() {
    return [StringType.Instance];
  }

  initialValue = '""';

  get typeOptions() {
    return {
      isImmutable: true,
      isAbstract: false,
      isIndexable: true,
      isDoubleIndexable: false,
      isIterable: true,
    };
  }

  static Instance: SymbolType = new StringType();

  name = StringName;

  toString(): string {
    return this.name;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return otherType instanceof StringType;
  }
}
