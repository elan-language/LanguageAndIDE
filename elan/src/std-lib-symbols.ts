import { ArrayType } from "./symbols/array-type";
import { BooleanType } from "./symbols/boolean-type";
import { DictionaryType } from "./symbols/dictionary-type";
import { FloatType } from "./symbols/number-type";
import { IntType } from "./symbols/int-type";
import { ListType } from "./symbols/list-type";
import { StringType } from "./symbols/string-type";
import { ISymbol, SymbolScope } from "./symbols/symbol";
import { ISymbolType } from "./symbols/symbol-type";
import { Scope } from "./frames/interfaces/scope";
import { FunctionType } from "./symbols/function-type";
import { GenericParameterType } from "./symbols/generic-parameter-type";
import { IterType } from "./symbols/iter-type";
import { UnknownSymbol } from "./symbols/unknown-symbol";
import { TupleType } from "./symbols/tuple-type";
import { ProcedureType } from "./symbols/procedure-type";

export class StdLibSymbols implements Scope {

    private getSymbol(id: string, st: ISymbolType) {
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
            ["asArray", this.getSymbol("asArray", new FunctionType([new IterType(new GenericParameterType("T"))], new ArrayType(new GenericParameterType("T"), false), true))],
            ["asList", this.getSymbol("asList", new FunctionType([new IterType(new GenericParameterType("T"))], new ListType(new GenericParameterType("T")), true))],
            ["keys", this.getSymbol("keys", new FunctionType([new DictionaryType(new GenericParameterType("T1"), new GenericParameterType("T2"))], new ListType(new GenericParameterType("T1")), true))],
            ["floor", this.getSymbol("floor", new FunctionType([FloatType.Instance], IntType.Instance, false))],
            ["ceiling", this.getSymbol("ceiling", new FunctionType([FloatType.Instance], IntType.Instance, false))],
            ["values", this.getSymbol("values", new FunctionType([new DictionaryType(new GenericParameterType("T1"), new GenericParameterType("T2"))], new ListType(new GenericParameterType("T1")), true))],
            ["hasKey", this.getSymbol("hasKey", new FunctionType([new DictionaryType(new GenericParameterType("T1"), new GenericParameterType("T2")), new GenericParameterType("T1")], BooleanType.Instance, true))],
            ["length", this.getSymbol("length", new FunctionType([new IterType(new GenericParameterType("T"))], FloatType.Instance, true))],
            ["setItem", this.getSymbol("setItem", new FunctionType([new DictionaryType(new GenericParameterType("T1"), new GenericParameterType("T2")), new GenericParameterType("T1"), new GenericParameterType("T2")], new DictionaryType(new GenericParameterType("T1"), new GenericParameterType("T2")), true))],
            ["removeItem", this.getSymbol("removeItem", new FunctionType([new DictionaryType(new GenericParameterType("T1"), new GenericParameterType("T2")), new GenericParameterType("T1")], new DictionaryType(new GenericParameterType("T1"), new GenericParameterType("T2")), true))],
            ["pi", this.getSymbol("pi", FloatType.Instance)],
            ["sin", this.getSymbol("sin", new FunctionType([FloatType.Instance], FloatType.Instance, false))],
            ["cos", this.getSymbol("cos", new FunctionType([FloatType.Instance], FloatType.Instance, false))],
            ["min", this.getSymbol("min", new FunctionType([FloatType.Instance, FloatType.Instance], FloatType.Instance, false))],
            ["isBefore", this.getSymbol("isBefore", new FunctionType([StringType.Instance, StringType.Instance], BooleanType.Instance, false))],
            ["isAfter", this.getSymbol("isAfter", new FunctionType([StringType.Instance, StringType.Instance], BooleanType.Instance, false))],
            ["isBeforeOrSameAs", this.getSymbol("isBeforeOrSameAs", new FunctionType([StringType.Instance, StringType.Instance], BooleanType.Instance, false))],
            ["isAfterOrSameAs", this.getSymbol("isAfterOrSameAs", new FunctionType([StringType.Instance, StringType.Instance], BooleanType.Instance, false))],
            ["newline", this.getSymbol("newline", StringType.Instance)],
            ["first", this.getSymbol("first", new FunctionType([new TupleType([new GenericParameterType("T1"), new GenericParameterType("T2")])], new GenericParameterType("T1"), true))],
            ["second", this.getSymbol("second", new FunctionType([new TupleType([new GenericParameterType("T1"), new GenericParameterType("T2")])], new GenericParameterType("T2"), true))],
            ["indexOf", this.getSymbol("indexOf", IntType.Instance)],
            ["typeAndProperties", this.getSymbol("typeAndProperties", new FunctionType([new GenericParameterType("")], StringType.Instance, false))],
            ["pause", this.getSymbol("pause", new ProcedureType([IntType.Instance]))],
            ["readKey", this.getSymbol("readKey", new FunctionType([], FloatType.Instance, false, false))],
            ["random", this.getSymbol("random", new FunctionType([IntType.Instance, IntType.Instance], IntType.Instance, false, false))],
        ]
    );

    resolveSymbol(id: string | undefined, scope: Scope): ISymbol {
        return id ? this.symbols.get(id) ?? UnknownSymbol.Instance : UnknownSymbol.Instance;
    }
}