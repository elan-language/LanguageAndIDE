import { Scope } from "./frames/interfaces/scope";
import { SymbolType } from "./frames/interfaces/symbol-type";

export const elanMetadataKey = Symbol("elan-metadata");

export enum Deprecation {
  methodRenamed,
  methodRemoved,
  classRenamed,
  classRemoved,
  methodParametersChanged,
  classParametersChanged,
  methodHidden
}

export interface Deprecated {
  reason: Deprecation;
  fromMajor: number;
  fromMinor: number;
  message: string;
}

export interface ElanDescriptor {
  deprecated?: Deprecated | undefined;
}

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
  mapType(scope: Scope): SymbolType;
}

export interface IElanProcedureDescriptor extends ElanMethodDescriptor {
  isProcedure: boolean;
  mapType(scope: Scope): SymbolType;
}

export interface TypeDescriptor extends ElanDescriptor {
  name: string;
  mapType(scope: Scope): SymbolType;
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
