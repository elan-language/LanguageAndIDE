import {
  ElanDescriptor,
  elanMetadataKey,
  IElanFunctionDescriptor,
  IElanProcedureDescriptor,
  isConstantDescriptor,
  isFunctionDescriptor,
  isProcedureDescriptor,
  TypeDescriptor,
} from "./elan-type-interfaces";
import { ElanSymbol } from "./frames/interfaces/elan-symbol";
import { Scope } from "./frames/interfaces/scope";
import { SymbolType } from "./frames/interfaces/symbol-type";
import { FunctionType } from "./frames/symbols/function-type";
import { NullScope } from "./frames/symbols/null-scope";
import { ProcedureType } from "./frames/symbols/procedure-type";
import { SymbolScope } from "./frames/symbols/symbol-scope";
import { UnknownSymbol } from "./frames/symbols/unknown-symbol";
import { Transforms } from "./frames/syntax-nodes/transforms";
import { StdLib } from "./std-lib";

export class StdLibSymbols implements Scope {
  constructor() {
    this.loadSymbols();
  }

  private symbols = new Map<string, ElanSymbol>();

  private loadSymbols() {
    const stdlib = new StdLib();

    const names = Object.getOwnPropertyNames(Object.getPrototypeOf(stdlib)).concat(
      Object.getOwnPropertyNames(stdlib),
    );

    for (let i = 0; i < names.length; i++) {
      const name = names[i];

      const metadata = Reflect.getMetadata(elanMetadataKey, stdlib, name) as
        | ElanDescriptor
        | undefined;

      if (isFunctionDescriptor(metadata)) {
        this.loadFunction(name, metadata);
      }

      if (isProcedureDescriptor(metadata)) {
        this.loadProcedure(name, metadata);
      }

      if (isConstantDescriptor(metadata)) {
        this.loadConstant(name, metadata);
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

  private loadConstant(name: string, descriptor: TypeDescriptor) {
    this.symbols.set(name, this.getSymbol(name, descriptor.mapType()));
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

  resolveSymbol(id: string | undefined, transforms: Transforms, scope: Scope): ElanSymbol {
    return id ? this.symbols.get(id) ?? new UnknownSymbol(id) : new UnknownSymbol();
  }
}
