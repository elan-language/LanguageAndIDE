import "reflect-metadata";
export const elanIgnoreMetadataKey = Symbol("elan-ignore");
export const elanMethodMetadataKey = Symbol("elan-method");

export interface ElanMethodDescriptor {
  isProcedure: boolean;
  isFunction: boolean;
  isExtension: boolean;
  isAsync: boolean;
  returnType?: string;
  parameters: string[];
  designParameters: string[];
}

export class ElanProcedureDescriptor implements ElanMethodDescriptor {
  constructor(
    public readonly isExtension: boolean,
    public readonly isAsync: boolean,
  ) {}

  isProcedure = true;
  isFunction = false;

  parameters: string[] = [];
  designParameters: string[] = [];
}

export class ElanFunctionDescriptor implements ElanMethodDescriptor {
  constructor(
    public readonly returnType: string,
    public readonly isExtension: boolean,
    public readonly isPure: boolean,
    public readonly isAsync: boolean,
  ) {}

  isProcedure = false;
  isFunction = true;

  parameters: string[] = [];
  designParameters: string[] = [];
}

export function elanIgnore(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
  Reflect.defineMetadata(elanIgnoreMetadataKey, true, target, propertyKey);
}

export function elanMethod(elanDesc: ElanMethodDescriptor) {
  return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    const designMetaData = Reflect.getMetadata("design:paramtypes", target, propertyKey);

    if (Array.isArray(designMetaData)) {
      elanDesc.designParameters = designMetaData.map((t: { name: string }) => t.name);
    }
    Reflect.defineMetadata(elanMethodMetadataKey, elanDesc, target, propertyKey);
  };
}

export function elanType(eType: string) {
  return function (target: object, propertyKey: string | symbol, parameterIndex: number) {
    const metaData: ElanMethodDescriptor = Reflect.getOwnMetadata(
      elanMethodMetadataKey,
      target,
      propertyKey,
    );

    metaData.parameters[parameterIndex] = eType;
    Reflect.defineMetadata(elanMethodMetadataKey, metaData, target, propertyKey);
  };
}
