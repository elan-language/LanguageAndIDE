// import { DictionarySymbolType } from "../interfaces/dictionary-symbol-type";
// import { SymbolType } from "../interfaces/symbol-type";
// import { isInvariantType } from "./symbol-helpers";

// export class DictionaryType implements DictionarySymbolType {
//   constructor(
//     public readonly keyType: SymbolType,
//     public readonly valueType: SymbolType,
//   ) {}

//   initialValue = "system.initialise(_stdlib.Dictionary.emptyInstance())";

//   factoryName = "system.dictionary";

//   get typeOptions() {
//     return {
//       isImmutable: false,
//       isAbstract: false,
//       isIndexable: true,
//       isDoubleIndexable: false,
//       isIterable: false,
//     };
//   }

//   get name() {
//     return `Dictionary<of ${this.keyType.name}, ${this.valueType.name}>`;
//   }

//   toString(): string {
//     return "Dictionary";
//   }

//   isAssignableFrom(otherType: SymbolType): boolean {
//     if (otherType instanceof DictionaryType) {
//       return (
//         isInvariantType(this.keyType, otherType.keyType, true) &&
//         isInvariantType(this.valueType, otherType.valueType, true)
//       );
//     }

//     return false;
//   }
// }
