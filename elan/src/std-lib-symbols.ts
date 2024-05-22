import { ArrayType } from "./frames/symbols/array-type";
import { BooleanType } from "./frames/symbols/boolean-type";
import { DictionaryType } from "./frames/symbols/dictionary-type";
import { FloatType } from "./frames/symbols/number-type";
import { IntType } from "./frames/symbols/int-type";
import { ListType } from "./frames/symbols/list-type";
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
        new FunctionType(
          [new GenericParameterType("T")],
          StringType.Instance,
          true,
        ),
      ),
    ],
    [
      "asArray",
      this.getSymbol(
        "asArray",
        new FunctionType(
          [new IterType(new GenericParameterType("T"))],
          new ArrayType(new GenericParameterType("T"), false),
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
          new ListType(new GenericParameterType("T")),
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
            new DictionaryType(
              new GenericParameterType("T1"),
              new GenericParameterType("T2"),
            ),
          ],
          new ListType(new GenericParameterType("T1")),
          true,
        ),
      ),
    ],
    [
      "floor",
      this.getSymbol(
        "floor",
        new FunctionType([FloatType.Instance], IntType.Instance, false),
      ),
    ],
    [
      "ceiling",
      this.getSymbol(
        "ceiling",
        new FunctionType([FloatType.Instance], IntType.Instance, false),
      ),
    ],
    [
      "values",
      this.getSymbol(
        "values",
        new FunctionType(
          [
            new DictionaryType(
              new GenericParameterType("T1"),
              new GenericParameterType("T2"),
            ),
          ],
          new ListType(new GenericParameterType("T1")),
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
            new DictionaryType(
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
        new FunctionType(
          [new IterType(new GenericParameterType("T"))],
          IntType.Instance,
          true,
        ),
      ),
    ],
    [
      "count",
      this.getSymbol(
        "count",
        new FunctionType(
          [new IterType(new GenericParameterType("T"))],
          IntType.Instance,
          true,
        ),
      ),
    ],
    [
      "setItem",
      this.getSymbol(
        "setItem",
        new FunctionType(
          [
            new DictionaryType(
              new GenericParameterType("T1"),
              new GenericParameterType("T2"),
            ),
            new GenericParameterType("T1"),
            new GenericParameterType("T2"),
          ],
          new DictionaryType(
            new GenericParameterType("T1"),
            new GenericParameterType("T2"),
          ),
          true,
        ),
      ),
    ],
    [
      "removeItem",
      this.getSymbol(
        "removeItem",
        new FunctionType(
          [
            new DictionaryType(
              new GenericParameterType("T1"),
              new GenericParameterType("T2"),
            ),
            new GenericParameterType("T1"),
          ],
          new DictionaryType(
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
      this.getSymbol(
        "sin",
        new FunctionType([FloatType.Instance], FloatType.Instance, false),
      ),
    ],
    [
      "cos",
      this.getSymbol(
        "cos",
        new FunctionType([FloatType.Instance], FloatType.Instance, false),
      ),
    ],
    [
      "sqrt",
      this.getSymbol(
        "sqrt",
        new FunctionType([FloatType.Instance], FloatType.Instance, false),
      ),
    ],
    [
      "isBefore",
      this.getSymbol(
        "isBefore",
        new FunctionType(
          [StringType.Instance, StringType.Instance],
          BooleanType.Instance,
          false,
        ),
      ),
    ],
    [
      "isAfter",
      this.getSymbol(
        "isAfter",
        new FunctionType(
          [StringType.Instance, StringType.Instance],
          BooleanType.Instance,
          false,
        ),
      ),
    ],
    [
      "isBeforeOrSameAs",
      this.getSymbol(
        "isBeforeOrSameAs",
        new FunctionType(
          [StringType.Instance, StringType.Instance],
          BooleanType.Instance,
          false,
        ),
      ),
    ],
    [
      "isAfterOrSameAs",
      this.getSymbol(
        "isAfterOrSameAs",
        new FunctionType(
          [StringType.Instance, StringType.Instance],
          BooleanType.Instance,
          false,
        ),
      ),
    ],
    ["newline", this.getSymbol("newline", StringType.Instance)],
    [
      "first",
      this.getSymbol(
        "first",
        new FunctionType(
          [
            new TupleType([
              new GenericParameterType("T1"),
              new GenericParameterType("T2"),
            ]),
          ],
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
          [
            new TupleType([
              new GenericParameterType("T1"),
              new GenericParameterType("T2"),
            ]),
          ],
          new GenericParameterType("T2"),
          true,
        ),
      ),
    ],
    ["indexOf", this.getSymbol("indexOf", IntType.Instance)],
    [
      "typeAndProperties",
      this.getSymbol(
        "typeAndProperties",
        new FunctionType(
          [new GenericParameterType("")],
          StringType.Instance,
          false,
        ),
      ),
    ],
    ["pause", this.getSymbol("pause", new ProcedureType([IntType.Instance]))],
    [
      "readKey",
      this.getSymbol(
        "readKey",
        new FunctionType([], FloatType.Instance, false, false),
      ),
    ],
    [
      "random",
      this.getSymbol(
        "random",
        new FunctionType(
          [IntType.Instance, IntType.Instance],
          IntType.Instance,
          false,
          false,
        ),
      ),
    ],
    [
      "toPrecision",
      this.getSymbol(
        "toPrecision",
        new FunctionType(
          [FloatType.Instance, IntType.Instance],
          StringType.Instance,
          true,
          true,
        ),
      ),
    ],
    [
      "filter",
      this.getSymbol(
        "filter",
        new FunctionType(
          [
            new IterType(new GenericParameterType("T")),
            new FunctionType([new GenericParameterType("T")], BooleanType.Instance, false)
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
            new FunctionType([new GenericParameterType("T")], new GenericParameterType("U"), false)
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
            new FunctionType([new GenericParameterType("U")], new GenericParameterType("T"), false)
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
        new FunctionType(
          [
            new IterType(FloatType.Instance),
          ],
          FloatType.Instance,
          true,
        ),
      ),
    ],
    [
      "maxBy",
      this.getSymbol(
        "maxBy",
        new FunctionType(
          [
            new IterType(new GenericParameterType("T")),
            new FunctionType([new GenericParameterType("T")], FloatType.Instance, false)
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
        new FunctionType(
          [
            new IterType(FloatType.Instance),
          ],
          FloatType.Instance,
          true,
        ),
      ),
    ],
    [
      "minBy",
      this.getSymbol(
        "minBy",
        new FunctionType(
          [
            new IterType(new GenericParameterType("T")),
            new FunctionType([new GenericParameterType("T")], FloatType.Instance, false)
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
            new FunctionType([new GenericParameterType("T")], BooleanType.Instance, false)
          ],
          BooleanType.Instance,
          true,
        ),
      ),
    ],
  ]);

  resolveSymbol(
    id: string | undefined,
    transforms: Transforms,
    scope: Scope,
  ): ElanSymbol {
    return id
      ? this.symbols.get(id) ?? new UnknownSymbol(id)
      : new UnknownSymbol();
  }
}
