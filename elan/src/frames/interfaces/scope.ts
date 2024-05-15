import { ISymbol } from "../../symbols/symbol";
import { Transforms } from "../syntax-nodes/transforms";

export interface Scope {
    resolveSymbol(id: string | undefined, transforms: Transforms, scope : Scope): ISymbol;
}