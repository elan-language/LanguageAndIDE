import { ISymbol } from "../../symbols/symbol";

export interface Scope {
    resolveSymbol(id: string, scope : Scope): ISymbol;
}