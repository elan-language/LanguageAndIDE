import { CodeStatus } from "../frames/code-status";
import { ISymbol } from "./symbol";
import { ISymbolType } from "./symbol-type";

export function compatibleType(symbol: ISymbol | undefined, symbolType: ISymbolType | undefined): CodeStatus {
    if (symbol?.symbolType?.name === symbolType?.name) {
        return CodeStatus.valid;
    }
    return CodeStatus.invalid;
}