import { ElanCompilerError } from "./elan-compiler-error";
import {
  elanIgnoreMetadataKey,
  ElanMethodDescriptor,
  elanMethodMetadataKey,
  TypeDescriptor,
} from "./elan-type-interfaces";
import { SymbolType } from "./frames/interfaces/symbol-type";
import { AbstractDictionaryType } from "./frames/symbols/abstract-dictionary-type";
import { ArrayType } from "./frames/symbols/array-list-type";
import { BooleanType } from "./frames/symbols/boolean-type";
import { DictionaryType } from "./frames/symbols/dictionary-type";
import { FloatType } from "./frames/symbols/float-type";
import { FunctionType } from "./frames/symbols/function-type";
import { GenericParameterType } from "./frames/symbols/generic-parameter-type";
import { ImmutableDictionaryType } from "./frames/symbols/immutable-dictionary-type";
import { IntType } from "./frames/symbols/int-type";
import { IterableType } from "./frames/symbols/iterable-type";
import { ListType } from "./frames/symbols/list-type";
import { StringType } from "./frames/symbols/string-type";

export class ElanProcedureDescriptor implements ElanMethodDescriptor {
  constructor(
    public readonly isExtension: boolean = false,
    public readonly isAsync: boolean = false,
  ) {}

  isProcedure = true;
  isFunction = false;
  isPure = false;

  parameters: TypeDescriptor[] = [];
}

export class ElanFunctionDescriptor implements ElanMethodDescriptor {
  constructor(
    public readonly isExtension: boolean = false,
    public readonly isPure: boolean = true,
    public readonly isAsync: boolean = false,
    public readonly returnType?: TypeDescriptor,
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
  returnType: TypeDescriptor | undefined;
}

export class ElanTypeDescriptor implements TypeDescriptor {
  constructor(
    public readonly name: string,
    public readonly ofType?: ElanTypeDescriptor,
    public readonly valueType?: ElanTypeDescriptor,
  ) {}

  mapType(): SymbolType {
    switch (this.name) {
      case "Float":
        return FloatType.Instance;
      case "String":
        return StringType.Instance;
      case "Int":
        return IntType.Instance;
      case "Boolean":
        return BooleanType.Instance;
      case "Iterable":
        return new IterableType(this.ofType!.mapType());
      case "Array":
        return new ArrayType(this.ofType!.mapType());
      case "List":
        return new ListType(this.ofType!.mapType());
      case "AbstractDictionary":
        return new AbstractDictionaryType(this.ofType!.mapType(), this.valueType!.mapType());
      case "ImmutableDictionary":
        return new ImmutableDictionaryType(this.ofType!.mapType(), this.valueType!.mapType());
      case "Dictionary":
        return new DictionaryType(this.ofType!.mapType(), this.valueType!.mapType());
    }
    throw new Error("NotImplemented: " + this.name);
  }
}

export class ElanGenericTypeDescriptor implements TypeDescriptor {
  constructor(public readonly name: string) {}

  mapType(): SymbolType {
    return new GenericParameterType(this.name);
  }
}

export class ElanFuncTypeDescriptor implements TypeDescriptor {
  constructor(
    public readonly parameters: TypeDescriptor[],
    public readonly returnType: TypeDescriptor,
  ) {}

  name = "Func";

  mapType(): SymbolType {
    return new FunctionType(
      this.parameters.map((p) => p.mapType()),
      this.returnType.mapType(),
      false,
    );
  }
}

export class TypescriptTypeDescriptor implements TypeDescriptor {
  constructor(public readonly name: string) {}

  mapType(): SymbolType {
    switch (this.name) {
      case "Number":
        return FloatType.Instance;
      case "String":
        return StringType.Instance;
      case "Boolean":
        return BooleanType.Instance;
      case "Function":
        throw new ElanCompilerError("Typescript 'Function' must be mapped into Elan types");
    }
    throw new Error("NotImplemented: " + this.name);
  }
}

export function elanIgnore(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
  Reflect.defineMetadata(elanIgnoreMetadataKey, true, target, propertyKey);
}

type tsType = { name: string };

function mapTypescriptType(t: tsType): TypescriptTypeDescriptor {
  return new TypescriptTypeDescriptor(t.name);
}

export function elanMethod(elanDesc: ElanMethodDescriptor) {
  return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    const paramTypesMetadata = Reflect.getMetadata("design:paramtypes", target, propertyKey);
    const retTypeMetadata = Reflect.getMetadata("design:returntype", target, propertyKey);

    if (Array.isArray(paramTypesMetadata)) {
      elanDesc.parameters = paramTypesMetadata.map((t) => mapTypescriptType(t));
    }

    if (!elanDesc.returnType && retTypeMetadata && retTypeMetadata.name) {
      elanDesc.returnType = new TypescriptTypeDescriptor(retTypeMetadata.name);
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

export function elanType(eType: ElanTypeDescriptor | ElanFuncTypeDescriptor) {
  return function (target: object, propertyKey: string | symbol, parameterIndex: number) {
    const metaData: ElanMethodDescriptor =
      Reflect.getOwnMetadata(elanMethodMetadataKey, target, propertyKey) ??
      new ElanParametersDescriptor();

    metaData.parameters[parameterIndex] = eType;
    Reflect.defineMetadata(elanMethodMetadataKey, metaData, target, propertyKey);
  };
}
