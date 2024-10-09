import {
  ElanDescriptor,
  ElanMethodDescriptor,
  elanMethodMetadataKey,
  IElanFunctionDescriptor,
  IElanProcedureDescriptor,
  isFunctionDescriptor,
  isProcedureDescriptor,
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
        | ElanDescriptor
        | undefined;

      if (isFunctionDescriptor(metadata)) {
        this.loadFunction(name, metadata);
      }

      if (isProcedureDescriptor(metadata)) {
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

  private loadFunction(name: string, descriptor: IElanFunctionDescriptor) {
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

  private loadProcedure(name: string, descriptor: IElanProcedureDescriptor) {
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
      "BlockGraphics",
      this.getSymbol(
        "BlockGraphics",
        new ListType(new TupleType([StringType.Instance, IntType.Instance, IntType.Instance])),
      ),
    ],
    ["pi", this.getSymbol("pi", FloatType.Instance)],

    ["Random", this.getSymbol("Random", new TupleType([IntType.Instance, IntType.Instance]))],

    ["black", this.getSymbol("black", IntType.Instance)],
    ["grey", this.getSymbol("grey", IntType.Instance)],
    ["white", this.getSymbol("white", IntType.Instance)],
    ["red", this.getSymbol("red", IntType.Instance)],
    ["green", this.getSymbol("green", IntType.Instance)],
    ["blue", this.getSymbol("blue", IntType.Instance)],
    ["yellow", this.getSymbol("yellow", IntType.Instance)],
    ["brown", this.getSymbol("brown", IntType.Instance)],
  ]);

  resolveSymbol(id: string | undefined, transforms: Transforms, scope: Scope): ElanSymbol {
    return id ? this.symbols.get(id) ?? new UnknownSymbol(id) : new UnknownSymbol();
  }
}
