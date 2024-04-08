import { ISymbol } from "../../symbols/symbol";
import { Scope } from "../interfaces/scope";
import { ParamDefAsn } from "./param-def-asn";

export class LambdaSigAsn implements Scope {

    constructor(private parameters: Array<ParamDefAsn>, private scope : Scope) {
    }

    resolveSymbol(id: string, scope: Scope): ISymbol {
        for (const p of this.parameters){
            if (p.id.trim() === id.trim()){
                return {symbolId : id, symbolType : p.symbolType};
            }
        }
        return scope.resolveSymbol(id, this);
    }

    toString() {
        const pp = this.parameters.map(p => p.toString()).join(", ");

        return `${pp}`;
    }
}