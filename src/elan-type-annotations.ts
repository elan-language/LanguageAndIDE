import {
  elanIgnoreMetadataKey,
  ElanMethodDescriptor,
  elanMethodMetadataKey,
  TypeDescriptor,
} from "./elan-type-interfaces";

export class ElanProcedureDescriptor implements ElanMethodDescriptor {
  constructor(
    public readonly isExtension: boolean,
    public readonly isAsync: boolean,
  ) {}

  isProcedure = true;
  isFunction = false;
  isPure = false;

  parameters: TypeDescriptor[] = [];
}

export class ElanFunctionDescriptor implements ElanMethodDescriptor {
  constructor(
    public readonly returnType: TypeDescriptor,
    public readonly isExtension: boolean,
    public readonly isPure: boolean,
    public readonly isAsync: boolean,
  ) {}

  isProcedure = false;
  isFunction = true;

  parameters: TypeDescriptor[] = [];
}

export class ElanParametersDescriptor implements ElanMethodDescriptor {
  isProcedure = false;
  isFunction = false;
  isPure = false;
  isExtension = false;
  isAsync = false;

  parameters: TypeDescriptor[] = [];
}

export class ElanTypeDescriptor {
  constructor(public readonly name: string) {}
}

export class TypescriptTypeDescriptor {
  constructor(public readonly name: string) {}
}

export function elanIgnore(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
  Reflect.defineMetadata(elanIgnoreMetadataKey, true, target, propertyKey);
}

export function elanMethod(elanDesc: ElanMethodDescriptor) {
  return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    const designMetaData = Reflect.getMetadata("design:paramtypes", target, propertyKey);

    if (Array.isArray(designMetaData)) {
      elanDesc.parameters = designMetaData.map(
        (t: { name: string }) => new TypescriptTypeDescriptor(t.name),
      );
    }

    const metaData: ElanMethodDescriptor =
      Reflect.getOwnMetadata(elanMethodMetadataKey, target, propertyKey) ??
      new ElanParametersDescriptor();

    for (let i = 0; i <= elanDesc.parameters.length; i++) {
      const updatedParam = metaData.parameters[i];
      if (updatedParam) {
        elanDesc.parameters[i] = updatedParam;
      }
    }

    Reflect.defineMetadata(elanMethodMetadataKey, elanDesc, target, propertyKey);
  };
}

export function elanType(eType: ElanTypeDescriptor) {
  return function (target: object, propertyKey: string | symbol, parameterIndex: number) {
    const metaData: ElanMethodDescriptor =
      Reflect.getOwnMetadata(elanMethodMetadataKey, target, propertyKey) ??
      new ElanParametersDescriptor();

    metaData.parameters[parameterIndex] = eType;
    Reflect.defineMetadata(elanMethodMetadataKey, metaData, target, propertyKey);
  };
}
