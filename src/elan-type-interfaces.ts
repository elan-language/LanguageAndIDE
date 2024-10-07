export const elanIgnoreMetadataKey = Symbol("elan-ignore");
export const elanMethodMetadataKey = Symbol("elan-method");

export interface ElanMethodDescriptor {
  isProcedure: boolean;
  isFunction: boolean;
  isExtension: boolean;
  isAsync: boolean;
  isPure: boolean;
  returnType?: TypeDescriptor;
  parameters: TypeDescriptor[];
}

export interface TypeDescriptor {
  name: string;
}
