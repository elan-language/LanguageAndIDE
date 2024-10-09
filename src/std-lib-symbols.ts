import {
  ElanMethodDescriptor,
  elanMethodMetadataKey,
  TypeDescriptor,
} from "./elan-type-interfaces";
import { ElanSymbol } from "./frames/interfaces/elan-symbol";
import { Scope } from "./frames/interfaces/scope";
import { SymbolType } from "./frames/interfaces/symbol-type";
import { ArrayType } from "./frames/symbols/array-list-type";
import { BooleanType } from "./frames/symbols/boolean-type";
import { FloatType } from "./frames/symbols/float-type";
import { FunctionType } from "./frames/symbols/function-type";
import { IntType } from "./frames/symbols/int-type";
import { ListType } from "./frames/symbols/list-type";
import { NullScope } from "./frames/symbols/null-scope";
import { ProcedureType } from "./frames/symbols/procedure-type";
import { RegexType } from "./frames/symbols/regex-type";
import { StringType } from "./frames/symbols/string-type";
import { SymbolScope } from "./frames/symbols/symbol-scope";
import { TupleType } from "./frames/symbols/tuple-type";
import { UnknownSymbol } from "./frames/symbols/unknown-symbol";
import { Transforms } from "./frames/syntax-nodes/transforms";
import { StdLib } from "./std-lib";

export class StdLibSymbols implements Scope {
  constructor() {
    this.loadSymbols();
  }

  private loadSymbols() {
    const stdlib = new StdLib();

    const names = Object.getOwnPropertyNames(Object.getPrototypeOf(stdlib));

    for (let i = 0; i < names.length; i++) {
      const name = names[i];

      const metadata = Reflect.getMetadata(elanMethodMetadataKey, stdlib, name) as
        | ElanMethodDescriptor
        | undefined;

      if (metadata && metadata.isFunction) {
        this.loadFunction(name, metadata);
      }

      if (metadata && metadata.isProcedure) {
        this.loadProcedure(name, metadata);
      }
    }
  }

  private createFunction(
    pTypes: TypeDescriptor[],
    retType: TypeDescriptor,
    isExtension: boolean,
    isPure: boolean,
    isAsync: boolean,
  ) {
    return new FunctionType(
      pTypes.map((t) => t.mapType()),
      retType.mapType(),
      isExtension,
      isPure,
      isAsync,
    );
  }

  private createProcedure(pTypes: TypeDescriptor[], isExtension: boolean, isAsync: boolean) {
    return new ProcedureType(
      pTypes.map((t) => t.mapType()),
      isExtension,
      isAsync,
    );
  }

  private loadFunction(name: string, descriptor: ElanMethodDescriptor) {
    const retType = descriptor.returnType;
    const parameterTypes = descriptor.parameters;

    const symbolType = this.createFunction(
      parameterTypes,
      retType!,
      descriptor.isExtension,
      descriptor.isPure!,
      descriptor.isAsync,
    );

    this.symbols.set(name, this.getSymbol(name, symbolType));
  }

  private loadProcedure(name: string, descriptor: ElanMethodDescriptor) {
    const parameterTypes = descriptor.parameters;

    const symbolType = this.createProcedure(
      parameterTypes,
      descriptor.isExtension,
      descriptor.isAsync,
    );

    this.symbols.set(name, this.getSymbol(name, symbolType));
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
    // Block Graphics

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
