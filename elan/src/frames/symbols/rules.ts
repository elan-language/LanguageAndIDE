import { ParseStatus } from "../status-enums";
import { ISymbol } from "../interfaces/symbol";
import { ISymbolType } from "../interfaces/symbol-type";

// export function compatibleType(symbol: ISymbol | undefined, symbolType: ISymbolType | undefined): ParseStatus {
//     if (symbol?.symbolType().name === symbolType?.name) {
//         return ParseStatus.valid;
//     }
//     return ParseStatus.invalid;
// }