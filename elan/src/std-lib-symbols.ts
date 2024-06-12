import { ArrayListType } from "./frames/symbols/array-list-type";
import { BooleanType } from "./frames/symbols/boolean-type";
import { DictionaryType } from "./frames/symbols/dictionary-type";
import { FloatType } from "./frames/symbols/float-type";
import { IntType } from "./frames/symbols/int-type";
import { ImmutableListType } from "./frames/symbols/immutable-list-type";
import { StringType } from "./frames/symbols/string-type";
import { ElanSymbol } from "./frames/interfaces/symbol";
import { SymbolType } from "./frames/interfaces/symbol-type";
import { Scope } from "./frames/interfaces/scope";
import { FunctionType } from "./frames/symbols/function-type";
import { GenericParameterType } from "./frames/symbols/generic-parameter-type";
import { IterType } from "./frames/symbols/iter-type";
import { UnknownSymbol } from "./frames/symbols/unknown-symbol";
import { TupleType } from "./frames/symbols/tuple-type";
import { ProcedureType } from "./frames/symbols/procedure-type";
import { Transforms } from "./frames/syntax-nodes/transforms";
import { SymbolScope } from "./frames/symbols/symbol-scope";
import { Parent } from "./frames/interfaces/parent";
import { ImmutableDictionaryType } from "./frames/symbols/immutable-dictionary-type";
import { AbstractDictionaryType } from "./frames/symbols/abstract-dictionary-type";

export class StdLibSymbols implements Scope {
  getParent(): Parent {
    throw new Error("Method not implemented.");
  }

  private getSymbol(id: string, st: SymbolType): ElanSymbol {
    return {
      symbolId: id,
      symbolType: () => st,
      symbolScope: SymbolScope.stdlib,
    };
  }

  // todo - we need to load this from a .d.ts file also work out how to do generics
  private symbols = new Map<string, ElanSymbol>([
    [
      "asString",
      this.getSymbol(
        "asString",
        new FunctionType([new GenericParameterType("T")], StringType.Instance, true),
      ),
    ],
    [
      "asArray",
      this.getSymbol(
        "asArray",
        new FunctionType(
          [new IterType(new GenericParameterType("T"))],
          new ArrayListType(new GenericParameterType("T"), false),
          true,
        ),
      ),
    ],
    [
      "asList",
      this.getSymbol(
        "asList",
        new FunctionType(
          [new IterType(new GenericParameterType("T"))],
          new ImmutableListType(new GenericParameterType("T")),
          true,
        ),
      ),
    ],
    [
      "range",
      this.getSymbol(
        "range",
        new FunctionType(
          [IntType.Instance, IntType.Instance],
          new IterType(IntType.Instance),
          false,
        ),
      ),
    ],
    [
      "asIter",
      this.getSymbol(
        "asIter",
        new FunctionType(
          [new IterType(new GenericParameterType("T"))],
          new IterType(new GenericParameterType("T")),
          true,
        ),
      ),
    ],
    [
      "get",
      this.getSymbol(
        "get",
        new FunctionType(
          [new ImmutableListType(new GenericParameterType("T")), IntType.Instance],
          new GenericParameterType("T"),
          true,
        ),
      ),
    ],
    [
      "getKey",
      this.getSymbol(
        "getKey",
        new FunctionType(
          [
            new ImmutableDictionaryType(
              new GenericParameterType("T"),
              new GenericParameterType("U"),
            ),
            new GenericParameterType("T"),
          ],
          new GenericParameterType("U"),
          true,
        ),
      ),
    ],
    [
      "getRange",
      this.getSymbol(
        "getRange",
        new FunctionType(
          [
            new ImmutableListType(new GenericParameterType("T")),
            IntType.Instance,
            IntType.Instance,
          ],
          new ImmutableListType(new GenericParameterType("T")),
          true,
        ),
      ),
    ],
    [
      "head",
      this.getSymbol(
        "head",
        new FunctionType(
          [new IterType(new GenericParameterType("T"))],
          new GenericParameterType("T"),
          true,
        ),
      ),
    ],
    [
      "keys",
      this.getSymbol(
        "keys",
        new FunctionType(
          [
            new AbstractDictionaryType(
              new GenericParameterType("T1"),
              new GenericParameterType("T2"),
            ),
          ],
          new ImmutableListType(new GenericParameterType("T1")),
          true,
        ),
      ),
    ],
    [
      "mod",
      this.getSymbol(
        "mod",
        new FunctionType([IntType.Instance, IntType.Instance], IntType.Instance, false, true),
      ),
    ],
    [
      "div",
      this.getSymbol(
        "div",
        new FunctionType([IntType.Instance, IntType.Instance], IntType.Instance, false, true),
      ),
    ],
    [
      "floor",
      this.getSymbol(
        "floor",
        new FunctionType([FloatType.Instance], IntType.Instance, false, true),
      ),
    ],
    [
      "ceiling",
      this.getSymbol(
        "ceiling",
        new FunctionType([FloatType.Instance], IntType.Instance, false, true),
      ),
    ],
    [
      "values",
      this.getSymbol(
        "values",
        new FunctionType(
          [
            new AbstractDictionaryType(
              new GenericParameterType("T1"),
              new GenericParameterType("T2"),
            ),
          ],
          new ImmutableListType(new GenericParameterType("T1")),
          true,
        ),
      ),
    ],
    [
      "hasKey",
      this.getSymbol(
        "hasKey",
        new FunctionType(
          [
            new AbstractDictionaryType(
              new GenericParameterType("T1"),
              new GenericParameterType("T2"),
            ),
            new GenericParameterType("T1"),
          ],
          BooleanType.Instance,
          true,
        ),
      ),
    ],
    [
      "length",
      this.getSymbol(
        "length",
        new FunctionType([new IterType(new GenericParameterType("T"))], IntType.Instance, true),
      ),
    ],
    [
      "count",
      this.getSymbol(
        "count",
        new FunctionType([new IterType(new GenericParameterType("T"))], IntType.Instance, true),
      ),
    ],
    [
      "with",
      this.getSymbol(
        "with",
        new FunctionType(
          [
            new ImmutableListType(new GenericParameterType("T")),
            IntType.Instance,
            new GenericParameterType("T"),
          ],
          new ImmutableListType(new GenericParameterType("T")),
          true,
        ),
      ),
    ],
    [
      "withInsert",
      this.getSymbol(
        "withInsert",
        new FunctionType(
          [
            new ImmutableListType(new GenericParameterType("T")),
            IntType.Instance,
            new GenericParameterType("T"),
          ],
          new ImmutableListType(new GenericParameterType("T")),
          true,
        ),
      ),
    ],
    [
      "withRemove",
      this.getSymbol(
        "withRemove",
        new FunctionType(
          [new ImmutableListType(new GenericParameterType("T")), IntType.Instance],
          new ImmutableListType(new GenericParameterType("T")),
          true,
        ),
      ),
    ],
    [
      "withRemoveFirst",
      this.getSymbol(
        "withRemoveFirst",
        new FunctionType(
          [new ImmutableListType(new GenericParameterType("T")), new GenericParameterType("T")],
          new ImmutableListType(new GenericParameterType("T")),
          true,
        ),
      ),
    ],
    [
      "withRemoveAll",
      this.getSymbol(
        "withRemoveAll",
        new FunctionType(
          [new ImmutableListType(new GenericParameterType("T")), new GenericParameterType("T")],
          new ImmutableListType(new GenericParameterType("T")),
          true,
        ),
      ),
    ],
    [
      "add",
      this.getSymbol(
        "add",
        new ProcedureType(
          [new ArrayListType(new GenericParameterType("T"), false), new GenericParameterType("T")],
          true,
        ),
      ),
    ],
    [
      "insert",
      this.getSymbol(
        "insert",
        new ProcedureType(
          [
            new ArrayListType(new GenericParameterType("T"), false),
            IntType.Instance,
            new GenericParameterType("T"),
          ],
          true,
        ),
      ),
    ],
    [
      "remove",
      this.getSymbol(
        "remove",
        new ProcedureType(
          [new ArrayListType(new GenericParameterType("T"), false), IntType.Instance],
          true,
        ),
      ),
    ],
    [
      "removeFirst",
      this.getSymbol(
        "removeFirst",
        new ProcedureType(
          [new ArrayListType(new GenericParameterType("T"), false), new GenericParameterType("T")],
          true,
        ),
      ),
    ],
    [
      "removeAll",
      this.getSymbol(
        "removeAll",
        new ProcedureType(
          [new ArrayListType(new GenericParameterType("T"), false), new GenericParameterType("T")],
          true,
        ),
      ),
    ],
    [
      "withKey",
      this.getSymbol(
        "withKey",
        new FunctionType(
          [
            new ImmutableDictionaryType(
              new GenericParameterType("T1"),
              new GenericParameterType("T2"),
            ),
            new GenericParameterType("T1"),
            new GenericParameterType("T2"),
          ],
          new ImmutableDictionaryType(
            new GenericParameterType("T1"),
            new GenericParameterType("T2"),
          ),
          true,
        ),
      ),
    ],
    [
      "removeKey",
      this.getSymbol(
        "removeKey",
        new ProcedureType(
          [
            new DictionaryType(new GenericParameterType("T1"), new GenericParameterType("T2")),
            new GenericParameterType("T1"),
          ],
          true,
        ),
      ),
    ],
    [
      "withRemoveKey",
      this.getSymbol(
        "withRemoveKey",
        new FunctionType(
          [
            new ImmutableDictionaryType(
              new GenericParameterType("T1"),
              new GenericParameterType("T2"),
            ),
            new GenericParameterType("T1"),
          ],
          new ImmutableDictionaryType(
            new GenericParameterType("T1"),
            new GenericParameterType("T2"),
          ),
          true,
        ),
      ),
    ],
    ["pi", this.getSymbol("pi", FloatType.Instance)],
    [
      "sin",
      this.getSymbol("sin", new FunctionType([FloatType.Instance], FloatType.Instance, false)),
    ],
    [
      "cos",
      this.getSymbol("cos", new FunctionType([FloatType.Instance], FloatType.Instance, false)),
    ],
    [
      "sqrt",
      this.getSymbol("sqrt", new FunctionType([FloatType.Instance], FloatType.Instance, false)),
    ],
    [
      "isBefore",
      this.getSymbol(
        "isBefore",
        new FunctionType([StringType.Instance, StringType.Instance], BooleanType.Instance, false),
      ),
    ],
    [
      "isAfter",
      this.getSymbol(
        "isAfter",
        new FunctionType([StringType.Instance, StringType.Instance], BooleanType.Instance, false),
      ),
    ],
    [
      "isBeforeOrSameAs",
      this.getSymbol(
        "isBeforeOrSameAs",
        new FunctionType([StringType.Instance, StringType.Instance], BooleanType.Instance, false),
      ),
    ],
    [
      "isAfterOrSameAs",
      this.getSymbol(
        "isAfterOrSameAs",
        new FunctionType([StringType.Instance, StringType.Instance], BooleanType.Instance, false),
      ),
    ],
    ["newline", this.getSymbol("newline", StringType.Instance)],
    [
      "first",
      this.getSymbol(
        "first",
        new FunctionType(
          [new TupleType([new GenericParameterType("T1"), new GenericParameterType("T2")])],
          new GenericParameterType("T1"),
          true,
        ),
      ),
    ],
    [
      "second",
      this.getSymbol(
        "second",
        new FunctionType(
          [new TupleType([new GenericParameterType("T1"), new GenericParameterType("T2")])],
          new GenericParameterType("T2"),
          true,
        ),
      ),
    ],
    [
      "indexOf",
      this.getSymbol(
        "indexOf",
        new FunctionType([StringType.Instance, StringType.Instance], IntType.Instance, true),
      ),
    ],
    [
      "trim",
      this.getSymbol("trim", new FunctionType([StringType.Instance], StringType.Instance, true)),
    ],
    [
      "typeAndProperties",
      this.getSymbol(
        "typeAndProperties",
        new FunctionType([new GenericParameterType("")], StringType.Instance, false),
      ),
    ],
    ["pause", this.getSymbol("pause", new ProcedureType([IntType.Instance], false))],
    ["readKey", this.getSymbol("readKey", new FunctionType([], FloatType.Instance, false, false))],
    ["random", this.getSymbol("random", new FunctionType([], FloatType.Instance, false, false))],
    [
      "randomInt",
      this.getSymbol(
        "randomInt",
        new FunctionType([IntType.Instance, IntType.Instance], IntType.Instance, false, false),
      ),
    ],
    [
      "toPrecision",
      this.getSymbol(
        "toPrecision",
        new FunctionType([FloatType.Instance, IntType.Instance], StringType.Instance, true, true),
      ),
    ],
    [
      "filter",
      this.getSymbol(
        "filter",
        new FunctionType(
          [
            new IterType(new GenericParameterType("T")),
            new FunctionType([new GenericParameterType("T")], BooleanType.Instance, false),
          ],
          new IterType(new GenericParameterType("T")),
          true,
        ),
      ),
    ],
    [
      "map",
      this.getSymbol(
        "map",
        new FunctionType(
          [
            new IterType(new GenericParameterType("T")),
            new FunctionType([new GenericParameterType("T")], new GenericParameterType("U"), false),
          ],
          new IterType(new GenericParameterType("U")),
          true,
        ),
      ),
    ],
    [
      "reduce",
      this.getSymbol(
        "reduce",
        new FunctionType(
          [
            new IterType(new GenericParameterType("T")),
            new GenericParameterType("U"),
            new FunctionType(
              [new GenericParameterType("U"), new GenericParameterType("T")],
              new GenericParameterType("U"),
              false,
            ),
          ],
          new GenericParameterType("U"),
          true,
        ),
      ),
    ],
    [
      "max",
      this.getSymbol(
        "max",
        new FunctionType([new IterType(FloatType.Instance)], FloatType.Instance, true),
      ),
    ],
    [
      "maxBy",
      this.getSymbol(
        "maxBy",
        new FunctionType(
          [
            new IterType(new GenericParameterType("T")),
            new FunctionType([new GenericParameterType("T")], FloatType.Instance, false),
          ],
          new GenericParameterType("T"),
          true,
        ),
      ),
    ],
    [
      "min",
      this.getSymbol(
        "min",
        new FunctionType([new IterType(FloatType.Instance)], FloatType.Instance, true),
      ),
    ],
    [
      "minBy",
      this.getSymbol(
        "minBy",
        new FunctionType(
          [
            new IterType(new GenericParameterType("T")),
            new FunctionType([new GenericParameterType("T")], FloatType.Instance, false),
          ],
          new GenericParameterType("T"),
          true,
        ),
      ),
    ],
    [
      "any",
      this.getSymbol(
        "any",
        new FunctionType(
          [
            new IterType(new GenericParameterType("T")),
            new FunctionType([new GenericParameterType("T")], BooleanType.Instance, false),
          ],
          BooleanType.Instance,
          true,
        ),
      ),
    ],
    [
      "contains",
      this.getSymbol(
        "contains",
        new FunctionType(
          [new IterType(StringType.Instance), StringType.Instance],
          BooleanType.Instance,
          true,
        ),
      ),
    ],
    [
      "size",
      this.getSymbol(
        "size",
        new ProcedureType(
          [new ArrayListType(new GenericParameterType("T"), false), IntType.Instance],
          true,
        ),
      ),
    ],
    ["pause", this.getSymbol("pause", new ProcedureType([IntType.Instance], false, true))],
    ["clock", this.getSymbol("clock", new FunctionType([], IntType.Instance, false, false))],
    [
      "parseAsFloat",
      this.getSymbol(
        "parseAsFloat",
        new FunctionType(
          [StringType.Instance],
          new TupleType([BooleanType.Instance, FloatType.Instance]),
          true,
          true,
        ),
      ),
    ],
    [
      "parseAsInt",
      this.getSymbol(
        "parseAsInt",
        new FunctionType(
          [StringType.Instance],
          new TupleType([BooleanType.Instance, IntType.Instance]),
          true,
          true,
        ),
      ),
    ],
    // char map
    [
      "getEmptyCharMap",
      this.getSymbol(
        "getEmptyCharMap",
        new FunctionType(
          [],
          new ImmutableListType(
            new TupleType([StringType.Instance, IntType.Instance, IntType.Instance]),
          ),
          false,
          true,
        ),
      ),
    ],
    [
      "putAt",
      this.getSymbol(
        "putAt",
        new FunctionType(
          [
            new ImmutableListType(
              new TupleType([StringType.Instance, IntType.Instance, IntType.Instance]),
            ),
            IntType.Instance,
            IntType.Instance,
            new TupleType([StringType.Instance, IntType.Instance, IntType.Instance]),
          ],
          new ImmutableListType(
            new TupleType([StringType.Instance, IntType.Instance, IntType.Instance]),
          ),
          true,
          true,
        ),
      ),
    ],
    [
      "getAt",
      this.getSymbol(
        "getAt",
        new FunctionType(
          [
            new ImmutableListType(
              new TupleType([StringType.Instance, IntType.Instance, IntType.Instance]),
            ),
            IntType.Instance,
            IntType.Instance,
          ],
          new ImmutableListType(
            new TupleType([StringType.Instance, IntType.Instance, IntType.Instance]),
          ),
          true,
          true,
        ),
      ),
    ],
    [
      "putChar",
      this.getSymbol(
        "putChar",
        new FunctionType(
          [
            new ImmutableListType(
              new TupleType([StringType.Instance, IntType.Instance, IntType.Instance]),
            ),
            IntType.Instance,
            IntType.Instance,
            StringType.Instance,
          ],
          new ImmutableListType(
            new TupleType([StringType.Instance, IntType.Instance, IntType.Instance]),
          ),
          true,
          true,
        ),
      ),
    ],
    [
      "getChar",
      this.getSymbol(
        "getChar",
        new FunctionType(
          [
            new ImmutableListType(
              new TupleType([StringType.Instance, IntType.Instance, IntType.Instance]),
            ),
            IntType.Instance,
            IntType.Instance,
          ],
          StringType.Instance,
          true,
          true,
        ),
      ),
    ],
    [
      "putForeground",
      this.getSymbol(
        "putForeground",
        new FunctionType(
          [
            new ImmutableListType(
              new TupleType([StringType.Instance, IntType.Instance, IntType.Instance]),
            ),
            IntType.Instance,
            IntType.Instance,
            IntType.Instance,
          ],
          new ImmutableListType(
            new TupleType([StringType.Instance, IntType.Instance, IntType.Instance]),
          ),
          true,
          true,
        ),
      ),
    ],
    [
      "getForeground",
      this.getSymbol(
        "getForeground",
        new FunctionType(
          [
            new ImmutableListType(
              new TupleType([StringType.Instance, IntType.Instance, IntType.Instance]),
            ),
            IntType.Instance,
            IntType.Instance,
          ],
          IntType.Instance,
          true,
          true,
        ),
      ),
    ],
    [
      "putBackground",
      this.getSymbol(
        "putBackground",
        new FunctionType(
          [
            new ImmutableListType(
              new TupleType([StringType.Instance, IntType.Instance, IntType.Instance]),
            ),
            IntType.Instance,
            IntType.Instance,
            IntType.Instance,
          ],
          new ImmutableListType(
            new TupleType([StringType.Instance, IntType.Instance, IntType.Instance]),
          ),
          true,
          true,
        ),
      ),
    ],
    [
      "getBackground",
      this.getSymbol(
        "getBackground",
        new FunctionType(
          [
            new ImmutableListType(
              new TupleType([StringType.Instance, IntType.Instance, IntType.Instance]),
            ),
            IntType.Instance,
            IntType.Instance,
          ],
          IntType.Instance,
          true,
          true,
        ),
      ),
    ],
    ["clearGraphics", this.getSymbol("clearGraphics", new ProcedureType([], false, false))],
    ["clearConsole", this.getSymbol("clearConsole", new ProcedureType([], false, false))],
    ["clearKeyBuffer", this.getSymbol("clearKeyBuffer", new ProcedureType([], false, false))],
    ["readKey", this.getSymbol("readKey", new FunctionType([], StringType.Instance, false, false))],
    [
      "readKeyWithModifier",
      this.getSymbol(
        "readKey",
        new FunctionType(
          [],
          new TupleType([StringType.Instance, StringType.Instance]),
          false,
          false,
        ),
      ),
    ],
    [
      "setDefaultForeground",
      this.getSymbol("setDefaultForeground", new ProcedureType([IntType.Instance], false, false)),
    ],
    [
      "drawCharMap",
      this.getSymbol(
        "drawCharMap",
        new ProcedureType(
          [
            new ImmutableListType(
              new TupleType([StringType.Instance, IntType.Instance, IntType.Instance]),
            ),
          ],
          true,
          false,
        ),
      ),
    ],
  ]);

  resolveSymbol(id: string | undefined, transforms: Transforms, scope: Scope): ElanSymbol {
    return id ? this.symbols.get(id) ?? new UnknownSymbol(id) : new UnknownSymbol();
  }
}
