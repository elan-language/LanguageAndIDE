import { SymbolType } from "../interfaces/symbol-type";

export class StringType implements SymbolType {
  private constructor() {}

  get ofType() {
    return StringType.Instance;
  }

  initialValue = '""';

  get classOptions() {
    return {
      isImmutable: true,
      isAbstract: false,
      isIndexable: true,
      isDoubleIndexable: false,
      isIterable: true,
    }
  }

  static Instance: SymbolType = new StringType();

  name = "String";

  toString(): string {
    return `String`;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return otherType instanceof StringType;
  }
}
