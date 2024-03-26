import { ParseStatus } from "../frames/parse-status";
import { ISymbol } from "./symbol";
import { ISymbolType } from "./symbol-type";

export function compatibleType(symbol: ISymbol | undefined, symbolType: ISymbolType | undefined): ParseStatus {
    if (symbol?.symbolType?.name === symbolType?.name) {
        return ParseStatus.valid;
    }
    return ParseStatus.invalid;
}