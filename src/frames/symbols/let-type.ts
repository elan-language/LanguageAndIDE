// import { GenericSymbolType } from "../interfaces/generic-symbol-type";
// import { SymbolType } from "../interfaces/symbol-type";
// import { immutableTypeOptions } from "../interfaces/type-options";

// export class LetType implements GenericSymbolType {
//   constructor(public readonly ofTypes: SymbolType[]) {}

//   typeOptions = immutableTypeOptions;

//   initialValue = "";

//   get name() {
//     return `Let <${this.ofTypes[0].name}>`;
//   }

//   isAssignableFrom(_otherType: SymbolType): boolean {
//     return false;
//   }
// }
