import { SymbolType } from "./frames/interfaces/symbol-type";

export const elanMetadataKey = Symbol("elan-metadata");

export interface ElanDescriptor {}

export interface ElanMethodDescriptor extends ElanDescriptor {
  isExtension: boolean;
  isAsync: boolean;
  parameters: TypeDescriptor[];
}

export interface IElanFunctionDescriptor extends ElanMethodDescriptor {
  isPure: boolean;
  returnType: TypeDescriptor;

  isFunction: boolean;
}

export interface IElanProcedureDescriptor extends ElanMethodDescriptor {
  isProcedure: boolean;
}

export interface TypeDescriptor extends ElanDescriptor {
  name: string;
  mapType(): SymbolType;

  isConstant: boolean;
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
