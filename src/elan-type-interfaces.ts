import { Scope } from "./frames/interfaces/scope";
import { SymbolType } from "./frames/interfaces/symbol-type";

export const elanMetadataKey = Symbol("elan-metadata");

export interface ElanDescriptor {}

export interface ElanMethodDescriptor extends ElanDescriptor {
  isExtension: boolean;
  isAsync: boolean;
  parameterTypes: TypeDescriptor[];
  parameterNames: string[];
}

export interface IElanFunctionDescriptor extends ElanMethodDescriptor {
  isPure: boolean;
  returnType?: TypeDescriptor;

  isFunction: boolean;
  mapType(): SymbolType;
}

export interface IElanProcedureDescriptor extends ElanMethodDescriptor {
  isProcedure: boolean;
  mapType(): SymbolType;
}

export interface TypeDescriptor extends ElanDescriptor {
  name: string;
  mapType(scope?: Scope): SymbolType;
}

export function isFunctionDescriptor(d: ElanDescriptor | undefined): d is IElanFunctionDescriptor {
  return !!d && "isFunction" in d;
}

export function isProcedureDescriptor(
  d: ElanDescriptor | undefined,
): d is IElanProcedureDescriptor {
  return !!d && "isProcedure" in d;
}

export function isConstantDescriptor(d: ElanDescriptor | undefined): d is TypeDescriptor {
  return !!d && "isConstant" in d;
}

export function isClassDescriptor(d: ElanDescriptor | undefined): d is TypeDescriptor {
  return !!d && "isClass" in d;
}
