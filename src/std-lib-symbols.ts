import { elanTypeMetadataKey } from "./elan-type-annotations";
import { ElanSymbol } from "./frames/interfaces/elan-symbol";
import { Scope } from "./frames/interfaces/scope";
import { SymbolType } from "./frames/interfaces/symbol-type";
import { AbstractDictionaryType } from "./frames/symbols/abstract-dictionary-type";
import { ArrayType } from "./frames/symbols/array-list-type";
import { BooleanType } from "./frames/symbols/boolean-type";
import { DictionaryType } from "./frames/symbols/dictionary-type";
import { FloatType } from "./frames/symbols/float-type";
import { FunctionType } from "./frames/symbols/function-type";
import { GenericParameterType } from "./frames/symbols/generic-parameter-type";
import { ImmutableDictionaryType } from "./frames/symbols/immutable-dictionary-type";
import { IntType } from "./frames/symbols/int-type";
import { IterableType } from "./frames/symbols/iterable-type";
import { ListType } from "./frames/symbols/list-type";
import { NullScope } from "./frames/symbols/null-scope";
import { ProcedureType } from "./frames/symbols/procedure-type";
import { RegexType } from "./frames/symbols/regex-type";
import { StringType } from "./frames/symbols/string-type";
import { SymbolScope } from "./frames/symbols/symbol-scope";
import { TupleType } from "./frames/symbols/tuple-type";
import { UnknownSymbol } from "./frames/symbols/unknown-symbol";
import { UnknownType } from "./frames/symbols/unknown-type";
import { Transforms } from "./frames/syntax-nodes/transforms";
import { StdLib } from "./std-lib";

export class StdLibSymbols implements Scope {
  constructor() {
    this.loadSymbols();
  }

  private loadSymbols() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stdlib = new StdLib() as any;

    const names = Object.getOwnPropertyNames(Object.getPrototypeOf(stdlib));

    for (let i = 0; i < names.length; i++) {
      const m = names[i];
      const symbol = stdlib[m];
      if (typeof symbol === "function") {
        this.loadFunction(stdlib, symbol);
      }
    }
  }

  private mapType(type: string): SymbolType {
    switch (type) {
      case "Number":
        return FloatType.Instance;
      case "Float":
        return FloatType.Instance;
    }
    throw new Error("NotImplemented");
  }

  private createFunction(
    pTypes: string[],
    retType: string,
    isExtension: boolean,
    isPure: boolean,
    isAsync: boolean,
  ) {
    return new FunctionType(
      pTypes.map((t) => this.mapType(t)),
      this.mapType(retType),
      isExtension,
      isPure,
      isAsync,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  private loadFunction(tgt: any, f: Function) {
    const name = f.name;

    if (name === "abs") {
      const pTypes: string[] = Reflect.getMetadata("design:paramtypes", tgt, name).map(
        (t: { name: string }) => t.name,
      );
      const retType: string = Reflect.getMetadata("design:returntype", tgt, name).name;

      const epTypes = Reflect.getMetadata(elanTypeMetadataKey, tgt, name) as string[];

      for (let i = 0; i < pTypes.length; i++) {
        pTypes[i] = epTypes[i];
      }

      const f = this.createFunction(pTypes, retType, false, false, false);

      this.symbols.set(name, this.getSymbol(name, f));
    }
  }

  symbolMatches(id: string, all: boolean): ElanSymbol[] {
    return [...this.symbols.keys()]
      .filter((k) => k.startsWith(id) || all)
      .map((k) => this.symbols.get(k)!);
  }

  getParentScope(): Scope {
    return NullScope.Instance;
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
      "stringForUnicode",
      this.getSymbol(
        "stringForUnicode",
        new FunctionType([IntType.Instance], StringType.Instance, false),
      ),
    ],
    [
      "asUnicode",
      this.getSymbol("asUnicode", new FunctionType([StringType.Instance], IntType.Instance, true)),
    ],
    [
      "asArray",
      this.getSymbol(
        "asArray",
        new FunctionType(
          [new IterableType(new GenericParameterType("T"))],
          new ArrayType(new GenericParameterType("T")),
          true,
        ),
      ),
    ],
    [
      "asList",
      this.getSymbol(
        "asList",
        new FunctionType(
          [new IterableType(new GenericParameterType("T"))],
          new ListType(new GenericParameterType("T")),
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
          new IterableType(IntType.Instance),
          false,
        ),
      ),
    ],
    [
      "asIter",
      this.getSymbol(
        "asIter",
        new FunctionType(
          [new IterableType(new GenericParameterType("T"))],
          new IterableType(new GenericParameterType("T")),
          true,
        ),
      ),
    ],
    [
      "head",
      this.getSymbol(
        "head",
        new FunctionType(
          [new IterableType(new GenericParameterType("T"))],
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
          new ListType(new GenericParameterType("T1")),
          true,
        ),
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
      "round",
      this.getSymbol(
        "round",
        new FunctionType([FloatType.Instance, IntType.Instance], FloatType.Instance, false, true),
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
        new FunctionType([new IterableType(new GenericParameterType("T"))], IntType.Instance, true),
      ),
    ],
    [
      "putAt",
      this.getSymbol(
        "putAt",
        new ProcedureType(
          [
            new ArrayType(new GenericParameterType("T")),
            IntType.Instance,
            new GenericParameterType("T"),
          ],
          true,
          false,
        ),
      ),
    ],
    [
      "putAt2D",
      this.getSymbol(
        "putAt2D",
        new ProcedureType(
          [
            new ArrayType(new ArrayType(new GenericParameterType("T"))),
            IntType.Instance,
            IntType.Instance,
            new GenericParameterType("T"),
          ],
          true,
          false,
        ),
      ),
    ],
    [
      "putAtKey",
      this.getSymbol(
        "putAtKey",
        new ProcedureType(
          [
            new DictionaryType(new GenericParameterType("T1"), new GenericParameterType("T2")),
            new GenericParameterType("T1"),
            new GenericParameterType("T2"),
          ],
          true,
          false,
        ),
      ),
    ],
    [
      "withPutAt",
      this.getSymbol(
        "withPutAt",
        new FunctionType(
          [
            new ListType(new GenericParameterType("T")),
            IntType.Instance,
            new GenericParameterType("T"),
          ],
          new ListType(new GenericParameterType("T")),
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
            new ListType(new GenericParameterType("T")),
            IntType.Instance,
            new GenericParameterType("T"),
          ],
          new ListType(new GenericParameterType("T")),
          true,
        ),
      ),
    ],
    [
      "withRemoveAt",
      this.getSymbol(
        "withRemoveAt",
        new FunctionType(
          [new ListType(new GenericParameterType("T")), IntType.Instance],
          new ListType(new GenericParameterType("T")),
          true,
        ),
      ),
    ],
    [
      "withRemoveFirst",
      this.getSymbol(
        "withRemoveFirst",
        new FunctionType(
          [new ListType(new GenericParameterType("T")), new GenericParameterType("T")],
          new ListType(new GenericParameterType("T")),
          true,
        ),
      ),
    ],
    [
      "withRemoveAll",
      this.getSymbol(
        "withRemoveAll",
        new FunctionType(
          [new ListType(new GenericParameterType("T")), new GenericParameterType("T")],
          new ListType(new GenericParameterType("T")),
          true,
        ),
      ),
    ],
    [
      "append",
      this.getSymbol(
        "append",
        new ProcedureType(
          [new ArrayType(new GenericParameterType("T")), new GenericParameterType("T")],
          true,
          false,
        ),
      ),
    ],
    [
      "appendList",
      this.getSymbol(
        "appendList",
        new ProcedureType(
          [
            new ArrayType(new GenericParameterType("T")),
            new ArrayType(new GenericParameterType("T")),
          ],
          true,
          false,
        ),
      ),
    ],
    [
      "prepend",
      this.getSymbol(
        "prepend",
        new ProcedureType(
          [new ArrayType(new GenericParameterType("T")), new GenericParameterType("T")],
          true,
          false,
        ),
      ),
    ],
    [
      "prependList",
      this.getSymbol(
        "prependList",
        new ProcedureType(
          [
            new ArrayType(new GenericParameterType("T")),
            new ArrayType(new GenericParameterType("T")),
          ],
          true,
          false,
        ),
      ),
    ],
    [
      "insertAt",
      this.getSymbol(
        "insertAt",
        new ProcedureType(
          [
            new ArrayType(new GenericParameterType("T")),
            IntType.Instance,
            new GenericParameterType("T"),
          ],
          true,
          false,
        ),
      ),
    ],
    [
      "removeAt",
      this.getSymbol(
        "removeAt",
        new ProcedureType(
          [new ArrayType(new GenericParameterType("T")), IntType.Instance],
          true,
          false,
        ),
      ),
    ],
    [
      "removeFirst",
      this.getSymbol(
        "removeFirst",
        new ProcedureType(
          [new ArrayType(new GenericParameterType("T")), new GenericParameterType("T")],
          true,
          false,
        ),
      ),
    ],
    [
      "removeAll",
      this.getSymbol(
        "removeAll",
        new ProcedureType(
          [new ArrayType(new GenericParameterType("T")), new GenericParameterType("T")],
          true,
          false,
        ),
      ),
    ],
    [
      "withPutAtKey",
      this.getSymbol(
        "withPutAtKey",
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
      "removeAtKey",
      this.getSymbol(
        "removeAtKey",
        new ProcedureType(
          [
            new DictionaryType(new GenericParameterType("T1"), new GenericParameterType("T2")),
            new GenericParameterType("T1"),
          ],
          true,
          false,
        ),
      ),
    ],
    [
      "withRemoveAtKey",
      this.getSymbol(
        "withRemoveAtKey",
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
    [
      "upperCase",
      this.getSymbol(
        "upperCase",
        new FunctionType([StringType.Instance], StringType.Instance, true, true),
      ),
    ],
    [
      "lowerCase",
      this.getSymbol(
        "lowerCase",
        new FunctionType([StringType.Instance], StringType.Instance, true, true),
      ),
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
      "third",
      this.getSymbol(
        "third",
        new FunctionType(
          [
            new TupleType([
              new GenericParameterType("T1"),
              new GenericParameterType("T2"),
              new GenericParameterType("T3"),
            ]),
          ],
          new GenericParameterType("T3"),
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
        new FunctionType([new GenericParameterType("T")], StringType.Instance, false),
      ),
    ],

    ["random", this.getSymbol("random", new FunctionType([], FloatType.Instance, false, false))],
    [
      "randomInt",
      this.getSymbol(
        "randomInt",
        new FunctionType([IntType.Instance, IntType.Instance], IntType.Instance, false, false),
      ),
    ],
    [
      "filter",
      this.getSymbol(
        "filter",
        new FunctionType(
          [
            new IterableType(new GenericParameterType("T")),
            new FunctionType([new GenericParameterType("T")], BooleanType.Instance, false),
          ],
          new IterableType(new GenericParameterType("T")),
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
            new IterableType(new GenericParameterType("T")),
            new FunctionType([new GenericParameterType("T")], new GenericParameterType("U"), false),
          ],
          new IterableType(new GenericParameterType("U")),
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
            new IterableType(new GenericParameterType("T")),
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
      "sortBy",
      this.getSymbol(
        "sortBy",
        new FunctionType(
          [
            new IterableType(new GenericParameterType("T")),
            new FunctionType(
              [new GenericParameterType("T"), new GenericParameterType("T")],
              IntType.Instance,
              false,
            ),
          ],
          new IterableType(new GenericParameterType("T")),
          true,
        ),
      ),
    ],
    [
      "groupBy",
      this.getSymbol(
        "groupBy",
        new FunctionType(
          [
            new IterableType(new GenericParameterType("T")),
            new FunctionType([new GenericParameterType("T")], new GenericParameterType("U"), false),
          ],
          new IterableType(new IterableType(new GenericParameterType("U"))),
          true,
        ),
      ),
    ],
    [
      "max",
      this.getSymbol(
        "max",
        new FunctionType([new IterableType(FloatType.Instance)], FloatType.Instance, true),
      ),
    ],
    [
      "maxBy",
      this.getSymbol(
        "maxBy",
        new FunctionType(
          [
            new IterableType(new GenericParameterType("T")),
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
        new FunctionType([new IterableType(FloatType.Instance)], FloatType.Instance, true),
      ),
    ],
    [
      "minBy",
      this.getSymbol(
        "minBy",
        new FunctionType(
          [
            new IterableType(new GenericParameterType("T")),
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
            new IterableType(new GenericParameterType("T")),
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
          [new IterableType(new GenericParameterType("T")), new GenericParameterType("T")],
          BooleanType.Instance,
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
          false,
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
          false,
          true,
        ),
      ),
    ],
    [
      "create2DArray",
      this.getSymbol(
        "create2DArray",
        new FunctionType(
          [IntType.Instance, IntType.Instance, new GenericParameterType("T")],
          new ArrayType(new ArrayType(new GenericParameterType("T"))),
          false,
        ),
      ),
    ],
    [
      "createArray",
      this.getSymbol(
        "createArray",
        new FunctionType(
          [IntType.Instance, new GenericParameterType("T")],
          new ArrayType(new GenericParameterType("T")),
          false,
        ),
      ),
    ],
    // Block Graphics
    [
      "withBackground",
      this.getSymbol(
        "withBackground",
        new FunctionType(
          [
            new ListType(new TupleType([StringType.Instance, IntType.Instance, IntType.Instance])),
            IntType.Instance,
          ],
          new ListType(new TupleType([StringType.Instance, IntType.Instance, IntType.Instance])),
          true,
          true,
        ),
      ),
    ],
    [
      "withUnicode",
      this.getSymbol(
        "withUnicode",
        new FunctionType(
          [
            new ListType(new TupleType([StringType.Instance, IntType.Instance, IntType.Instance])),
            IntType.Instance,
            IntType.Instance,
            IntType.Instance,
            IntType.Instance,
            IntType.Instance,
          ],
          new ListType(new TupleType([StringType.Instance, IntType.Instance, IntType.Instance])),
          true,
          true,
        ),
      ),
    ],
    [
      "withText",
      this.getSymbol(
        "withText",
        new FunctionType(
          [
            new ListType(new TupleType([StringType.Instance, IntType.Instance, IntType.Instance])),
            IntType.Instance,
            IntType.Instance,
            StringType.Instance,
            IntType.Instance,
            IntType.Instance,
          ],
          new ListType(new TupleType([StringType.Instance, IntType.Instance, IntType.Instance])),
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
            new ListType(new TupleType([StringType.Instance, IntType.Instance, IntType.Instance])),
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
      "getForeground",
      this.getSymbol(
        "getForeground",
        new FunctionType(
          [
            new ListType(new TupleType([StringType.Instance, IntType.Instance, IntType.Instance])),
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
      "withBlock",
      this.getSymbol(
        "withBlock",
        new FunctionType(
          [
            new ListType(new TupleType([StringType.Instance, IntType.Instance, IntType.Instance])),
            IntType.Instance,
            IntType.Instance,
            IntType.Instance,
          ],
          new ListType(new TupleType([StringType.Instance, IntType.Instance, IntType.Instance])),
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
            new ListType(new TupleType([StringType.Instance, IntType.Instance, IntType.Instance])),
            IntType.Instance,
            IntType.Instance,
          ],
          IntType.Instance,
          true,
          true,
        ),
      ),
    ],
    ["print", this.getSymbol("print", new ProcedureType([StringType.Instance], false, false))],
    [
      "printTab",
      this.getSymbol(
        "printTab",
        new ProcedureType([IntType.Instance, StringType.Instance], false, false),
      ),
    ],
    ["clearConsole", this.getSymbol("clearConsole", new ProcedureType([], false, false))],
    [
      "clearGraphics",
      this.getSymbol(
        "clearGraphics",
        new ProcedureType(
          [new ListType(new TupleType([StringType.Instance, IntType.Instance, IntType.Instance]))],
          true,
          false,
        ),
      ),
    ],
    [
      "clearKeyBuffer",
      this.getSymbol(
        "clearKeyBuffer",
        new ProcedureType(
          [new ListType(new TupleType([StringType.Instance, IntType.Instance, IntType.Instance]))],
          true,
          false,
        ),
      ),
    ],
    [
      "getKeystroke",
      this.getSymbol(
        "getKeystroke",
        new FunctionType(
          [new ListType(new TupleType([StringType.Instance, IntType.Instance, IntType.Instance]))],
          StringType.Instance,
          true,
          false,
          true,
        ),
      ),
    ],
    [
      "getKeystrokeWithModifier",
      this.getSymbol(
        "getKeystrokeWithModifier",
        new FunctionType(
          [new ListType(new TupleType([StringType.Instance, IntType.Instance, IntType.Instance]))],
          new TupleType([StringType.Instance, StringType.Instance]),
          true,
          false,
          true,
        ),
      ),
    ],
    [
      "draw",
      this.getSymbol(
        "draw",
        new ProcedureType(
          [new ListType(new TupleType([StringType.Instance, IntType.Instance, IntType.Instance]))],
          true,
          true,
        ),
      ),
    ],
    [
      "BlockGraphics",
      this.getSymbol(
        "BlockGraphics",
        new ListType(new TupleType([StringType.Instance, IntType.Instance, IntType.Instance])),
      ),
    ],
    [
      "inputString",
      this.getSymbol(
        "inputString",
        new FunctionType([StringType.Instance], StringType.Instance, false, false, true),
      ),
    ],
    [
      "inputStringWithLimits",
      this.getSymbol(
        "inputStringWithLimits",
        new FunctionType(
          [StringType.Instance, IntType.Instance, IntType.Instance],
          StringType.Instance,
          false,
          false,
          true,
        ),
      ),
    ],
    [
      "inputStringFromOptions",
      this.getSymbol(
        "inputStringFromOptions",
        new FunctionType(
          [StringType.Instance, new ArrayType(StringType.Instance)],
          StringType.Instance,
          false,
          false,
          true,
        ),
      ),
    ],
    [
      "inputInt",
      this.getSymbol(
        "inputInt",
        new FunctionType([StringType.Instance], IntType.Instance, false, false, true),
      ),
    ],
    [
      "inputIntBetween",
      this.getSymbol(
        "inputIntBetween",
        new FunctionType(
          [StringType.Instance, IntType.Instance, IntType.Instance],
          IntType.Instance,
          false,
          false,
          true,
        ),
      ),
    ],
    [
      "inputFloat",
      this.getSymbol(
        "inputFloat",
        new FunctionType([StringType.Instance], FloatType.Instance, false, false, true),
      ),
    ],
    [
      "inputFloatBetween",
      this.getSymbol(
        "inputFloatBetween",
        new FunctionType(
          [StringType.Instance, FloatType.Instance, FloatType.Instance],
          FloatType.Instance,
          false,
          false,
          true,
        ),
      ),
    ],
    ["pi", this.getSymbol("pi", FloatType.Instance)],
    [
      "abs",
      this.getSymbol("abs", new FunctionType([FloatType.Instance], FloatType.Instance, false)),
    ],
    [
      "acos",
      this.getSymbol("acos", new FunctionType([FloatType.Instance], FloatType.Instance, false)),
    ],
    [
      "acosDeg",
      this.getSymbol("acosDeg", new FunctionType([FloatType.Instance], FloatType.Instance, false)),
    ],
    [
      "asin",
      this.getSymbol("asin", new FunctionType([FloatType.Instance], FloatType.Instance, false)),
    ],
    [
      "asinDeg",
      this.getSymbol("asinDeg", new FunctionType([FloatType.Instance], FloatType.Instance, false)),
    ],
    [
      "atan",
      this.getSymbol("atan", new FunctionType([FloatType.Instance], FloatType.Instance, false)),
    ],
    [
      "atanDeg",
      this.getSymbol("atanDeg", new FunctionType([FloatType.Instance], FloatType.Instance, false)),
    ],
    [
      "cos",
      this.getSymbol("cos", new FunctionType([FloatType.Instance], FloatType.Instance, false)),
    ],
    [
      "cosDeg",
      this.getSymbol("cosDeg", new FunctionType([FloatType.Instance], FloatType.Instance, false)),
    ],
    [
      "exp",
      this.getSymbol("exp", new FunctionType([FloatType.Instance], FloatType.Instance, false)),
    ],
    [
      "logE",
      this.getSymbol("logE", new FunctionType([FloatType.Instance], FloatType.Instance, false)),
    ],
    [
      "log10",
      this.getSymbol("log10", new FunctionType([FloatType.Instance], FloatType.Instance, false)),
    ],
    [
      "log2",
      this.getSymbol("log2", new FunctionType([FloatType.Instance], FloatType.Instance, false)),
    ],
    [
      "sin",
      this.getSymbol("sin", new FunctionType([FloatType.Instance], FloatType.Instance, false)),
    ],
    [
      "sinDeg",
      this.getSymbol("sinDeg", new FunctionType([FloatType.Instance], FloatType.Instance, false)),
    ],
    [
      "sqrt",
      this.getSymbol("sqrt", new FunctionType([FloatType.Instance], FloatType.Instance, false)),
    ],
    [
      "tan",
      this.getSymbol("tan", new FunctionType([FloatType.Instance], FloatType.Instance, false)),
    ],
    [
      "tanDeg",
      this.getSymbol("tanDeg", new FunctionType([FloatType.Instance], FloatType.Instance, false)),
    ],
    [
      "degToRad",
      this.getSymbol("degToRad", new FunctionType([FloatType.Instance], FloatType.Instance, false)),
    ],
    [
      "radToDeg",
      this.getSymbol("radToDeg", new FunctionType([FloatType.Instance], FloatType.Instance, false)),
    ],
    ["Random", this.getSymbol("Random", new TupleType([IntType.Instance, IntType.Instance]))],
    [
      "next",
      this.getSymbol(
        "next",
        new FunctionType(
          [new TupleType([IntType.Instance, IntType.Instance])],
          new TupleType([IntType.Instance, IntType.Instance]),
          true,
        ),
      ),
    ],
    [
      "value",
      this.getSymbol(
        "value",
        new FunctionType(
          [new TupleType([IntType.Instance, IntType.Instance])],
          FloatType.Instance,
          true,
        ),
      ),
    ],
    [
      "valueInt",
      this.getSymbol(
        "valueInt",
        new FunctionType(
          [new TupleType([IntType.Instance, IntType.Instance]), IntType.Instance, IntType.Instance],
          IntType.Instance,
          true,
        ),
      ),
    ],
    [
      "firstRandom",
      this.getSymbol(
        "firstRandom",
        new FunctionType([], new TupleType([IntType.Instance, IntType.Instance]), false, false),
      ),
    ],
    [
      "firstRandomInFixedSequence",
      this.getSymbol(
        "firstRandomInFixedSequence",
        new FunctionType([], new TupleType([IntType.Instance, IntType.Instance]), false, false),
      ),
    ],
    ["black", this.getSymbol("black", IntType.Instance)],
    ["grey", this.getSymbol("grey", IntType.Instance)],
    ["white", this.getSymbol("white", IntType.Instance)],
    ["red", this.getSymbol("red", IntType.Instance)],
    ["green", this.getSymbol("green", IntType.Instance)],
    ["blue", this.getSymbol("blue", IntType.Instance)],
    ["yellow", this.getSymbol("yellow", IntType.Instance)],
    ["brown", this.getSymbol("brown", IntType.Instance)],
    [
      "bitAnd",
      this.getSymbol(
        "bitAnd",
        new FunctionType([IntType.Instance, IntType.Instance], IntType.Instance, false),
      ),
    ],
    [
      "bitOr",
      this.getSymbol(
        "bitOr",
        new FunctionType([IntType.Instance, IntType.Instance], IntType.Instance, false),
      ),
    ],
    [
      "bitXor",
      this.getSymbol(
        "bitXor",
        new FunctionType([IntType.Instance, IntType.Instance], IntType.Instance, false),
      ),
    ],
    [
      "bitNot",
      this.getSymbol("bitNot", new FunctionType([IntType.Instance], IntType.Instance, false)),
    ],
    [
      "bitShiftL",
      this.getSymbol(
        "bitShiftL",
        new FunctionType([IntType.Instance, IntType.Instance], IntType.Instance, false),
      ),
    ],
    [
      "bitShiftR",
      this.getSymbol(
        "bitShiftR",
        new FunctionType([IntType.Instance, IntType.Instance], IntType.Instance, false),
      ),
    ],
    [
      "asBinary",
      this.getSymbol("asBinary", new FunctionType([IntType.Instance], StringType.Instance, true)),
    ],
    [
      "matchesRegex",
      this.getSymbol(
        "matchesRegex",
        new FunctionType([StringType.Instance, RegexType.Instance], BooleanType.Instance, true),
      ),
    ],
    [
      "openRead",
      this.getSymbol(
        "openRead",
        new FunctionType(
          [StringType.Instance],
          new TupleType([IntType.Instance, StringType.Instance, IntType.Instance]),
          false,
          false,
          true,
        ),
      ),
    ],
    [
      "readLine",
      this.getSymbol(
        "readLine",
        new FunctionType(
          [new TupleType([IntType.Instance, StringType.Instance, IntType.Instance])],
          StringType.Instance,
          true,
          false,
          true,
        ),
      ),
    ],
    [
      "endOfFile",
      this.getSymbol(
        "endOfFile",
        new FunctionType(
          [new TupleType([IntType.Instance, StringType.Instance, IntType.Instance])],
          BooleanType.Instance,
          true,
          true,
          true,
        ),
      ),
    ],
    [
      "close",
      this.getSymbol(
        "close",
        new ProcedureType(
          [new TupleType([IntType.Instance, StringType.Instance, IntType.Instance])],
          true,
          true,
        ),
      ),
    ],
  ]);

  resolveSymbol(id: string | undefined, transforms: Transforms, scope: Scope): ElanSymbol {
    return id ? this.symbols.get(id) ?? new UnknownSymbol(id) : new UnknownSymbol();
  }
}
