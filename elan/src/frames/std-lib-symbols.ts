import { ArrayType } from "../symbols/array-type";
import { BooleanType } from "../symbols/boolean-type";
import { DictionaryType } from "../symbols/dictionary-type";
import { NumberType } from "../symbols/number-type";
import { IntType } from "../symbols/int-type";
import { ListType } from "../symbols/list-type";
import { StringType } from "../symbols/string-type";
import { ISymbol, SymbolScope } from "../symbols/symbol";
import { ISymbolType } from "../symbols/symbol-type";
import { UnknownType } from "../symbols/unknown-type";
import { Scope } from "./interfaces/scope";
import { FunctionType } from "../symbols/function-type";

export class StdLibSymbols implements Scope {

    private getSymbol(id : string, st : ISymbolType){
        return {
            symbolId: id,
            symbolType: st,
            symbolScope: SymbolScope.stdlib
        };
    }


    // todo - we need to load this from a .d.ts file also work out how to do generics
    private symbols = new Map<string, ISymbol>(
        [
            ["asString", this.getSymbol("asString", new FunctionType([], StringType.Instance, true))],
            ["asArray", this.getSymbol("asArray", new FunctionType([], new ArrayType(IntType.Instance), true))],
            ["asList", this.getSymbol("asList", new FunctionType([], new ListType(IntType.Instance), true))],
            ["keys", this.getSymbol("keys", new ListType(StringType.Instance))],
            ["values", this.getSymbol("values", new ListType(IntType.Instance))],
            ["hasKey", this.getSymbol("hasKey", BooleanType.Instance)],
            ["length", this.getSymbol("length", IntType.Instance)],
            ["setItem", this.getSymbol("setItem", new DictionaryType(StringType.Instance, IntType.Instance))],
            ["removeItem", this.getSymbol("removeItem", new DictionaryType(StringType.Instance, IntType.Instance))],
            ["pi", this.getSymbol("pi", NumberType.Instance)],
            ["sin", this.getSymbol("sin", NumberType.Instance)],
            ["cos", this.getSymbol("cos", NumberType.Instance)],
            ["min", this.getSymbol("min", NumberType.Instance)],
            ["isBefore", this.getSymbol("isBefore", BooleanType.Instance)],
            ["isAfter", this.getSymbol("isAfter", BooleanType.Instance)],
            ["isBeforeOrSameAs", this.getSymbol("isBeforeOrSameAs", BooleanType.Instance)],
            ["isAfterOrSameAs", this.getSymbol("isAfterOrSameAs", BooleanType.Instance)],
            ["newline", this.getSymbol("newline", StringType.Instance)],
            ["first", this.getSymbol("first", StringType.Instance)],
            ["second", this.getSymbol("second", StringType.Instance)],
            ["indexOf", this.getSymbol("indexOf", IntType.Instance)]
        ]
    );

    undefinedSymbol(id: string) {
        return {
            symbolId: id,
            symbolType: UnknownType.Instance,
            symbolScope: undefined
        };
    }

    resolveSymbol(id: string, scope: Scope): ISymbol {
        return this.symbols.get(id) ?? this.undefinedSymbol(id);
    }
}