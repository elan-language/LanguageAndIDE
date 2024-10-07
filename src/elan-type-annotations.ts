import "reflect-metadata";
export const elanTypeMetadataKey = Symbol("elan-type");
export const elanIgnoreMetadataKey = Symbol("elan-ignore");

export function elanIgnore(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
  Reflect.defineMetadata(elanIgnoreMetadataKey, true, target, propertyKey);
}

export function elanType(eType: string) {
  return function (target: object, propertyKey: string | symbol, parameterIndex: number) {
    const typeMetaData: string[] =
      Reflect.getOwnMetadata(elanTypeMetadataKey, target, propertyKey) || [];

    typeMetaData[parameterIndex] = eType;

    Reflect.defineMetadata(elanTypeMetadataKey, typeMetaData, target, propertyKey);
  };
}
