import { ArrayType } from "../symbols/array-type";
import { IntType } from "../symbols/int-type";
import { ISymbol, SymbolScope } from "../symbols/symbol";
import { ISymbolType } from "../symbols/symbol-type";
import { UnknownType } from "../symbols/unknown-type";
import { Scope } from "./interfaces/scope";

export class StdLibSymbols implements Scope {

    // todo - we need to load this from a .d.ts file also work out how to do generics
    private symbols = new Map<string, ISymbolType>([["asArray", new ArrayType(IntType.Instance)]]);

    resolveSymbol(id: string, scope: Scope): ISymbol {
        const st = this.symbols.get(id);
        return {
            symbolId: id,
            symbolType: st ?? UnknownType.Instance,
            symbolScope: st ? SymbolScope.stdlib : undefined
        };
    }
}