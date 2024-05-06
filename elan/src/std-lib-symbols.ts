import { ArrayType } from "./symbols/array-type";
import { BooleanType } from "./symbols/boolean-type";
import { DictionaryType } from "./symbols/dictionary-type";
import { NumberType } from "./symbols/number-type";
import { IntType } from "./symbols/int-type";
import { ListType } from "./symbols/list-type";
import { StringType } from "./symbols/string-type";
import { ISymbol, SymbolScope } from "./symbols/symbol";
import { ISymbolType } from "./symbols/symbol-type";
import { UnknownType } from "./symbols/unknown-type";
import { Scope } from "./frames/interfaces/scope";
import { FunctionType } from "./symbols/function-type";
import { GenericParameterType } from "./symbols/generic-parameter-type";
import { IterType } from "./symbols/iter-type";
import { UnknownSymbol } from "./symbols/unknown-symbol";
import { ClassType } from "./symbols/class-type";
import { GenericClassType } from "./symbols/generic-class-type";

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
            ["asString", this.getSymbol("asString", new FunctionType([new GenericParameterType("T")], StringType.Instance, true))],
            ["asArray", this.getSymbol("asArray", new FunctionType([new IterType(new GenericParameterType("T"))], new ArrayType(new GenericParameterType("T")), true))],
            ["asList", this.getSymbol("asList", new FunctionType([new IterType(new GenericParameterType("T"))], new ListType(new GenericParameterType("T")), true))],
            ["keys", this.getSymbol("keys", new ListType(StringType.Instance))],
            ["floor", this.getSymbol("floor", new FunctionType([NumberType], IntType.Instance))],
            ["ceiling", this.getSymbol("ceiling", new FunctionType([NumberType], IntType.Instance))],
            ["values", this.getSymbol("values", new ListType(IntType.Instance))],
            ["hasKey", this.getSymbol("hasKey", BooleanType.Instance)],
            ["length", this.getSymbol("length", new FunctionType([new IterType(new GenericParameterType("T"))], NumberType.Instance, true))],
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
            ["indexOf", this.getSymbol("indexOf", IntType.Instance)],
            ["typeAndProperties", this.getSymbol("typeAndProperties", new FunctionType([new GenericParameterType("")], StringType.Instance))],
        ]
    );

    resolveSymbol(id: string, scope: Scope): ISymbol {
        return this.symbols.get(id) ?? UnknownSymbol.Instance;
    }
}