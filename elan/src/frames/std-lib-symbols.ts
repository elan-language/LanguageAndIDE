import { ArrayType } from "../symbols/array-type";
import { BooleanType } from "../symbols/boolean-type";
import { DictionaryType } from "../symbols/dictionary-type";
import { FloatType } from "../symbols/float-type";
import { IntType } from "../symbols/int-type";
import { ListType } from "../symbols/list-type";
import { StringType } from "../symbols/string-type";
import { ISymbol, SymbolScope } from "../symbols/symbol";
import { ISymbolType } from "../symbols/symbol-type";
import { UnknownType } from "../symbols/unknown-type";
import { Scope } from "./interfaces/scope";

export class StdLibSymbols implements Scope {

    // todo - we need to load this from a .d.ts file also work out how to do generics
    private symbols = new Map<string, ISymbolType>(
        [
            ["asString", StringType.Instance],
            ["asArray", new ArrayType(IntType.Instance)],
            ["asList", new ListType(IntType.Instance)],
            ["keys", new ListType(StringType.Instance)],
            ["values", new ListType(IntType.Instance)],
            ["hasKey", BooleanType.Instance],
            ["length", IntType.Instance],
            ["setItem", new DictionaryType(StringType.Instance, IntType.Instance)],
            ["removeItem", new DictionaryType(StringType.Instance, IntType.Instance)],
            ["pi", FloatType.Instance],
            ["sin", FloatType.Instance],
            ["cos", FloatType.Instance],
            ["min", FloatType.Instance],
            ["isBefore", BooleanType.Instance],
            ["isAfter", BooleanType.Instance],
            ["isBeforeOrSameAs", BooleanType.Instance],
            ["isAfterOrSameAs", BooleanType.Instance]
        ]
    );

    resolveSymbol(id: string, scope: Scope): ISymbol {
        const st = this.symbols.get(id);
        return {
            symbolId: id,
            symbolType: st ?? UnknownType.Instance,
            symbolScope: st ? SymbolScope.stdlib : undefined
        };
    }
}