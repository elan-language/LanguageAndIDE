import { ElanSymbol } from "../interfaces/symbol";

export class DuplicateSymbol implements ElanSymbol {
  constructor(public readonly duplicates: ElanSymbol[]) {}
  get symbolId() {
    return this.duplicates[0].symbolId;
  }

  get symbolType() {
    return this.duplicates[0].symbolType;
  }

  get symbolScope() {
    return this.duplicates[0].symbolScope;
  }

  name = "Duplicate Symbol";
}
