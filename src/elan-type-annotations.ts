import "reflect-metadata";
export const elanTypeMetadataKey = Symbol("elan-type");

/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
//export function extension(target: any, p: any) {}

export function elanType(eType: string) {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const existingParameterTypes: string[] =
      Reflect.getOwnMetadata(elanTypeMetadataKey, target, propertyKey) || [];

    existingParameterTypes[parameterIndex] = eType;

    Reflect.defineMetadata(elanTypeMetadataKey, existingParameterTypes, target, propertyKey);
  };
}
