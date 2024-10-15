import { ElanCompilerError } from "./elan-compiler-error";
import {
  ElanDescriptor,
  elanMetadataKey,
  ElanMethodDescriptor,
  IElanFunctionDescriptor,
  IElanProcedureDescriptor,
  isFunctionDescriptor,
  isProcedureDescriptor,
  TypeDescriptor,
} from "./elan-type-interfaces";
import { ElanSymbol } from "./frames/interfaces/elan-symbol";
import { Scope } from "./frames/interfaces/scope";
import { SymbolType } from "./frames/interfaces/symbol-type";
import { AbstractDictionaryType } from "./frames/symbols/abstract-dictionary-type";
import { ArrayType } from "./frames/symbols/array-list-type";
import { BooleanType } from "./frames/symbols/boolean-type";
import { ClassType } from "./frames/symbols/class-type";
import { ClassTypeDef } from "./frames/symbols/class-type-def";
import { DictionaryType } from "./frames/symbols/dictionary-type";
import { FloatType } from "./frames/symbols/float-type";
import { FunctionType } from "./frames/symbols/function-type";
import { GenericParameterType } from "./frames/symbols/generic-parameter-type";
import { ImmutableDictionaryType } from "./frames/symbols/immutable-dictionary-type";
import { IntType } from "./frames/symbols/int-type";
import { IterableType } from "./frames/symbols/iterable-type";
import { ListType } from "./frames/symbols/list-type";
import { ProcedureType } from "./frames/symbols/procedure-type";
import { RegexType } from "./frames/symbols/regex-type";
import { StringType } from "./frames/symbols/string-type";
import { SymbolScope } from "./frames/symbols/symbol-scope";
import { TupleType } from "./frames/symbols/tuple-type";

export class ElanProcedureDescriptor implements ElanMethodDescriptor, IElanProcedureDescriptor {
  constructor(
    public readonly isExtension: boolean = false,
    public readonly isAsync: boolean = false,
  ) {}

  isProcedure = true;

  isPure = false;

  parameters: TypeDescriptor[] = [];

  mapType(): SymbolType {
    const parameterTypes = this.parameters;

    return createProcedure(parameterTypes, this.isExtension, this.isAsync);
  }
}

export class ElanFunctionDescriptor implements ElanMethodDescriptor, IElanFunctionDescriptor {
  constructor(
    public readonly isExtension: boolean = false,
    public readonly isPure: boolean = true,
    public readonly isAsync: boolean = false,
    public readonly returnType?: TypeDescriptor,
  ) {}

  isFunction = true;

  parameters: TypeDescriptor[] = [];

  mapType(): SymbolType {
    const retType = this.returnType;
    const parameterTypes = this.parameters;

    return createFunction(parameterTypes, retType!, this.isExtension, this.isPure!, this.isAsync);
  }
}

export class ElanParametersDescriptor implements ElanMethodDescriptor {
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

  isConstant = true;

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
      case "Regex":
        return RegexType.Instance;
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

  isConstant = true;

  mapType(): SymbolType {
    return new GenericParameterType(this.name);
  }
}

export class ElanFuncTypeDescriptor implements TypeDescriptor {
  constructor(
    public readonly parameters: TypeDescriptor[],
    public readonly returnType: TypeDescriptor,
  ) {}

  isConstant = true;

  name = "Func";

  mapType(): SymbolType {
    return new FunctionType(
      this.parameters.map((p) => p.mapType()),
      this.returnType.mapType(),
      false,
    );
  }
}

export class ElanTupleTypeDescriptor implements TypeDescriptor {
  constructor(public readonly parameters: TypeDescriptor[]) {}

  name = "Tuple";

  isConstant = true;

  mapType(): SymbolType {
    return new TupleType(this.parameters.map((p) => p.mapType()));
  }
}

const tempMap = new Map<string, ClassType>();

function removeUnderscore(name: string) {
  return name.startsWith("_") ? name.slice(1) : name;
}

export class ElanClassTypeDescriptor implements TypeDescriptor {
  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(private readonly cls: Function) {}

  isClass = true;

  name = "Class";

  mapType(scope?: Scope): SymbolType {
    const names = Object.getOwnPropertyNames(this.cls.prototype);
    const children: [string, SymbolType][] = [];
    const className = removeUnderscore(this.cls.name);

    if (tempMap.has(className)) {
      return tempMap.get(className)!;
    } else {
      tempMap.set(className, new ClassType(className, false, false, [], undefined));
    }

    for (let i = 0; i < names.length; i++) {
      const name = names[i];

      const metadata = Reflect.getMetadata(elanMetadataKey, this.cls.prototype, name) as
        | ElanDescriptor
        | undefined;

      // todo
      if (name === "constructor") {
        children.push([name, new ProcedureType([], false, false)]);
      }

      if (isFunctionDescriptor(metadata)) {
        children.push([name, metadata.mapType()]);
      }

      if (isProcedureDescriptor(metadata)) {
        children.push([name, metadata.mapType()]);
      }

      // if (isConstantDescriptor(metadata)) {
      //   this.symbols.set(name, this.getSymbol(name, metadata.mapType()));
      // }
    }

    const classType = tempMap.get(className)!;
    tempMap.delete(className);

    const classTypeDef = new ClassTypeDef(className, [], scope!);

    classType.updateScope(classTypeDef);

    for (const c of children) {
      classTypeDef.children.push(getSymbol(c[0], c[1], SymbolScope.property));
    }

    return classType;
  }
}

export class TypescriptTypeDescriptor implements TypeDescriptor {
  constructor(public readonly name: string) {}

  isConstant = true;

  mapType(): SymbolType {
    switch (this.name) {
      case "Number":
        return FloatType.Instance;
      case "String":
        return StringType.Instance;
      case "Boolean":
        return BooleanType.Instance;
      case "RegExp":
        return RegexType.Instance;
      case "Function":
        throw new ElanCompilerError("Typescript 'Function' must be mapped into Elan types");
      case "Array":
        throw new ElanCompilerError("Typescript 'Array' must be mapped into Elan types");
    }
    throw new Error("NotImplemented: " + this.name);
  }
}

type tsType = { name: string };

function mapTypescriptType(t: tsType): TypescriptTypeDescriptor {
  return new TypescriptTypeDescriptor(t.name);
}

export function elanFunction(options?: FunctionOptions, retType?: TypeDescriptor) {
  const flags = mapFunctionOptions(options ?? FunctionOptions.pure, retType);
  return elanMethod(new ElanFunctionDescriptor(...flags));
}

export function elanFunctionMethod(options?: FunctionOptions, retType?: TypeDescriptor) {
  const flags = mapFunctionOptions(options ?? FunctionOptions.pure, retType);
  return elanMethod(new ElanFunctionDescriptor(...flags));
}

export function elanProcedure(options?: ProcedureOptions) {
  const flags = mapProcedureOptions(options ?? ProcedureOptions.default);
  return elanMethod(new ElanProcedureDescriptor(...flags));
}

export function elanConstructor() {
  return elanMethod(new ElanProcedureDescriptor());
}

export function elanMethod(elanDesc: ElanMethodDescriptor) {
  return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    const paramTypesMetadata = Reflect.getMetadata("design:paramtypes", target, propertyKey);
    const retTypeMetadata = Reflect.getMetadata("design:returntype", target, propertyKey);

    if (Array.isArray(paramTypesMetadata)) {
      elanDesc.parameters = paramTypesMetadata.map((t) => mapTypescriptType(t));
    }

    if (
      isFunctionDescriptor(elanDesc) &&
      !elanDesc.returnType &&
      retTypeMetadata &&
      retTypeMetadata.name
    ) {
      elanDesc.returnType = new TypescriptTypeDescriptor(retTypeMetadata.name);
    }

    const metaData: ElanMethodDescriptor =
      Reflect.getOwnMetadata(elanMetadataKey, target, propertyKey) ??
      new ElanParametersDescriptor();

    for (let i = 0; i <= elanDesc.parameters.length; i++) {
      const updatedParam = metaData.parameters[i];
      if (updatedParam) {
        elanDesc.parameters[i] = updatedParam;
      }
    }

    Reflect.defineMetadata(elanMetadataKey, elanDesc, target, propertyKey);
  };
}

export function elanClass() {
  return function (target: object) {
    const typeMetadata = Reflect.getMetadata("design:type", target);
    if (typeMetadata) {
      Reflect.defineMetadata(elanMetadataKey, typeMetadata, target);
    }
  };
}

export function elanConstant(elanDesc?: TypeDescriptor) {
  return function (target: object, propertyKey: string) {
    const typeMetadata = Reflect.getMetadata("design:type", target, propertyKey);

    if (!elanDesc && typeMetadata && typeMetadata.name) {
      elanDesc = new TypescriptTypeDescriptor(typeMetadata.name);
    }

    Reflect.defineMetadata(elanMetadataKey, elanDesc, target, propertyKey);
  };
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function elanClassExport(cls: Function) {
  let elanDesc = ElanClass(cls) as TypeDescriptor;
  return function (target: object, propertyKey: string) {
    const typeMetadata = Reflect.getMetadata("design:type", target, propertyKey);

    if (!elanDesc && typeMetadata && typeMetadata.name) {
      elanDesc = new TypescriptTypeDescriptor(typeMetadata.name);
    }

    Reflect.defineMetadata(elanMetadataKey, elanDesc, target, propertyKey);
  };
}

export function elanType(eType: ElanTypeDescriptor | ElanFuncTypeDescriptor) {
  return function (target: object, propertyKey: string | symbol, parameterIndex: number) {
    const metaData: ElanMethodDescriptor =
      Reflect.getOwnMetadata(elanMetadataKey, target, propertyKey) ??
      new ElanParametersDescriptor();

    metaData.parameters[parameterIndex] = eType;
    Reflect.defineMetadata(elanMetadataKey, metaData, target, propertyKey);
  };
}

export const ElanInt: ElanTypeDescriptor = new ElanTypeDescriptor("Int");
export const ElanFloat: ElanTypeDescriptor = new ElanTypeDescriptor("Float");
export const ElanString: ElanTypeDescriptor = new ElanTypeDescriptor("String");
export const ElanBoolean: ElanTypeDescriptor = new ElanTypeDescriptor("Boolean");
export const ElanRegex: ElanTypeDescriptor = new ElanTypeDescriptor("Regex");

export const ElanT1: ElanTypeDescriptor = new ElanGenericTypeDescriptor("T1");
export const ElanT2: ElanTypeDescriptor = new ElanGenericTypeDescriptor("T2");

export function ElanList(ofType: ElanTypeDescriptor) {
  return new ElanTypeDescriptor("List", ofType);
}

export function ElanArray(ofType: ElanTypeDescriptor) {
  return new ElanTypeDescriptor("Array", ofType);
}

export function ElanIterable(ofType: ElanTypeDescriptor) {
  return new ElanTypeDescriptor("Iterable", ofType);
}

export function ElanAbstractDictionary(keyType: ElanTypeDescriptor, valueType: ElanTypeDescriptor) {
  return new ElanTypeDescriptor("AbstractDictionary", keyType, valueType);
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function ElanClass(cls: Function) {
  return new ElanClassTypeDescriptor(cls);
}

export function ElanImmutableDictionary(
  keyType: ElanTypeDescriptor,
  valueType: ElanTypeDescriptor,
) {
  return new ElanTypeDescriptor("ImmutableDictionary", keyType, valueType);
}

export function ElanDictionary(keyType: ElanTypeDescriptor, valueType: ElanTypeDescriptor) {
  return new ElanTypeDescriptor("Dictionary", keyType, valueType);
}

export function ElanTuple(ofTypes: ElanTypeDescriptor[]) {
  return new ElanTupleTypeDescriptor(ofTypes);
}

export function ElanFunc(parameters: ElanTypeDescriptor[], returnType: ElanTypeDescriptor) {
  return new ElanFuncTypeDescriptor(parameters, returnType);
}

export function elanIntType() {
  return elanType(ElanInt);
}

export function elanFloatType() {
  return elanType(ElanFloat);
}

export function elanStringType() {
  return elanType(ElanString);
}

export function elanBooleanType() {
  return elanType(ElanBoolean);
}

export function elanRegexType() {
  return elanType(ElanRegex);
}

export function elanGenericParamT1Type() {
  return elanType(ElanT1);
}

export function elanGenericParamT2Type() {
  return elanType(ElanT2);
}

export function elanListType(ofType: ElanTypeDescriptor) {
  return elanType(ElanList(ofType));
}

export function elanArrayType(ofType: ElanTypeDescriptor) {
  return elanType(ElanArray(ofType));
}

export function elanIterableType(ofType: ElanTypeDescriptor) {
  return elanType(ElanIterable(ofType));
}

export function elanAbstractDictionaryType(
  keyType: ElanTypeDescriptor,
  valueType: ElanTypeDescriptor,
) {
  return elanType(ElanAbstractDictionary(keyType, valueType));
}

export function elanImmutableDictionaryType(
  keyType: ElanTypeDescriptor,
  valueType: ElanTypeDescriptor,
) {
  return elanType(ElanImmutableDictionary(keyType, valueType));
}

export function elanDictionaryType(keyType: ElanTypeDescriptor, valueType: ElanTypeDescriptor) {
  return elanType(ElanDictionary(keyType, valueType));
}

export function elanTupleType(ofTypes: ElanTypeDescriptor[]) {
  return elanType(ElanTuple(ofTypes));
}

export function elanFuncType(parameters: ElanTypeDescriptor[], returnType: ElanTypeDescriptor) {
  return elanType(ElanFunc(parameters, returnType));
}

export enum FunctionOptions {
  pure,
  pureExtension,
  pureAsync,
  pureAsyncExtension,
  impure,
  impureExtension,
  impureAsync,
  impureAsyncExtension,
}

export enum ProcedureOptions {
  default,
  extension,
  async,
  asyncExtension,
}

function mapFunctionOptions(
  options: FunctionOptions,
  retType?: TypeDescriptor,
): [boolean, boolean, boolean, TypeDescriptor | undefined] {
  switch (options) {
    case FunctionOptions.pure:
      return [false, true, false, retType];
    case FunctionOptions.pureExtension:
      return [true, true, false, retType];
    case FunctionOptions.pureAsync:
      return [true, true, false, retType];
    case FunctionOptions.pureAsyncExtension:
      return [true, true, true, retType];
    case FunctionOptions.impure:
      return [false, false, false, retType];
    case FunctionOptions.impureExtension:
      return [true, false, false, retType];
    case FunctionOptions.impureAsync:
      return [false, false, true, retType];
    case FunctionOptions.impureAsyncExtension:
      return [true, false, true, retType];
  }
}

function mapProcedureOptions(options: ProcedureOptions): [boolean, boolean] {
  switch (options) {
    case ProcedureOptions.default:
      return [false, false];
    case ProcedureOptions.extension:
      return [true, false];
    case ProcedureOptions.async:
      return [false, true];
    case ProcedureOptions.asyncExtension:
      return [true, true];
  }
}

export function createProcedure(pTypes: TypeDescriptor[], isExtension: boolean, isAsync: boolean) {
  return new ProcedureType(
    pTypes.map((t) => t.mapType()),
    isExtension,
    isAsync,
  );
}

export function createFunction(
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

export function getSymbol(id: string, st: SymbolType, ss: SymbolScope): ElanSymbol {
  if (st instanceof ClassType) {
    return st.scope!;
  }

  return {
    symbolId: id,
    symbolType: () => st,
    symbolScope: ss,
  };
}
