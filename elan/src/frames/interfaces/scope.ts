import { ISymbol } from "../../symbols/symbol";

export interface Scope {
    resolveSymbol(id: string | undefined, scope : Scope): ISymbol;
}