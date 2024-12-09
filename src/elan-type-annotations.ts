import { ElanCompilerError } from "./elan-compiler-error";
import {
  ElanDescriptor,
  elanMetadataKey,
  ElanMethodDescriptor,
  IElanFunctionDescriptor,
  IElanProcedureDescriptor,
  isConstantDescriptor,
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
import { StdLibClass } from "./frames/symbols/stdlib-class";
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

  parameterTypes: TypeDescriptor[] = [];

  parameterNames: string[] = [];

  mapType(): SymbolType {
    const parameterTypes = this.parameterTypes;

    return new ProcedureType(
      this.parameterNames,
      parameterTypes.map((t) => t.mapType()),
      this.isExtension,
      this.isAsync,
    );
  }
}

export class ElanClassDescriptor implements ElanDescriptor {
  constructor(
    public readonly isImmutable: boolean = false,
    public readonly isAbstract: boolean = false,
    public readonly ofTypes: TypeDescriptor[] = [],
    public readonly parameterNames: string[] = [],
    public readonly parameterTypes: TypeDescriptor[] = [],
    public readonly inherits: ElanClassTypeDescriptor[] = [],
    public readonly alias?: string,
  ) {}

  mapType(): SymbolType {
    const parameterTypes = this.parameterTypes;

    return new ProcedureType(
      this.parameterNames,
      parameterTypes.map((t) => t.mapType()),
      false,
      false,
    );
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

  parameterTypes: TypeDescriptor[] = [];

  parameterNames: string[] = [];

  mapType(): SymbolType {
    const retType = this.returnType!;
    const parameterTypes = this.parameterTypes;

    return new FunctionType(
      this.parameterNames,
      parameterTypes.map((t) => t.mapType()),
      retType.mapType(),
      this.isExtension,
      this.isPure,
      this.isAsync,
    );
  }
}

export class ElanSignatureDescriptor implements ElanMethodDescriptor {
  isPure = false;
  isExtension = false;
  isAsync = false;

  parameterNames: string[] = [];

  parameterTypes: TypeDescriptor[] = [];
  returnType: TypeDescriptor | undefined;
}

export class ElanValueTypeDescriptor implements TypeDescriptor {
  constructor(
    public readonly name: string,
    public readonly ofType?: TypeDescriptor,
    public readonly valueType?: TypeDescriptor,
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
      this.parameters.map((t) => t.name),
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
  constructor(
    private readonly cls: { name: string; prototype: object; emptyInstance: () => object },
  ) {}

  isClass = true;

  name = "Class";

  mapType(scope?: Scope): SymbolType {
    const classMetadata: ElanClassDescriptor =
      Reflect.getMetadata(elanMetadataKey, this.cls) ?? new ElanClassDescriptor();

    const className = classMetadata.alias ?? removeUnderscore(this.cls.name);

    if (tempMap.has(className)) {
      return tempMap.get(className)!;
    }

    const names = Object.getOwnPropertyNames(this.cls.prototype).concat(
      Object.getOwnPropertyNames(this.cls.emptyInstance()),
    );

    const children: [string, SymbolType, MemberType][] = [];

    tempMap.set(className, new ClassType(className, false, false, [], undefined!));

    for (let i = 0; i < names.length; i++) {
      const name = names[i];

      const metadata = Reflect.getMetadata(elanMetadataKey, this.cls.prototype, name) as
        | ElanDescriptor
        | undefined;

      if (name === "constructor") {
        children.push([name, classMetadata.mapType(), MemberType.procedure]);
      }

      if (isFunctionDescriptor(metadata)) {
        children.push([name, metadata.mapType(), MemberType.function]);
      }

      if (isProcedureDescriptor(metadata)) {
        children.push([name, metadata.mapType(), MemberType.procedure]);
      }

      if (isConstantDescriptor(metadata)) {
        children.push([name, metadata.mapType(), MemberType.property]);
      }
    }

    const classType = tempMap.get(className)!;
    tempMap.delete(className);

    const classTypeDef = new StdLibClass(
      className,
      classMetadata.isAbstract,
      classMetadata.isImmutable,
      [],
      [],
      [],
      scope!,
    );

    classType.updateScope(classTypeDef);

    for (const c of children) {
      classTypeDef.children.push(getSymbol(c[0], c[1], SymbolScope.member, c[2]));
    }

    for (const ot of classMetadata.ofTypes) {
      classTypeDef.ofTypes.push(ot.mapType());
    }

    for (const inherits of classMetadata.inherits) {
      classTypeDef.inheritTypes.push(inherits.mapType());
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
    throw new ElanCompilerError("Missing type annotation in stdlib class");
  }
}

type tsType = { name: string };

function mapTypescriptType(t: tsType): TypescriptTypeDescriptor {
  return new TypescriptTypeDescriptor(t.name);
}

export function elanFunction(
  parameterNames: string[],
  options?: FunctionOptions,
  retType?: TypeDescriptor,
) {
  const flags = mapFunctionOptions(options ?? FunctionOptions.pure, retType);
  return elanMethod(parameterNames, new ElanFunctionDescriptor(...flags));
}

export function elanProcedure(parameterNames: string[], options?: ProcedureOptions) {
  const flags = mapProcedureOptions(options ?? ProcedureOptions.default);
  return elanMethod(parameterNames, new ElanProcedureDescriptor(...flags));
}

export function elanMethod(parameterNames: string[], elanDesc: ElanMethodDescriptor) {
  return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    const paramTypesMetadata = Reflect.getMetadata("design:paramtypes", target, propertyKey);
    const retTypeMetadata = Reflect.getMetadata("design:returntype", target, propertyKey);

    if (Array.isArray(paramTypesMetadata)) {
      elanDesc.parameterTypes = paramTypesMetadata.map((t) => mapTypescriptType(t));
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
      Reflect.getOwnMetadata(elanMetadataKey, target, propertyKey) ?? new ElanSignatureDescriptor();

    for (let i = 0; i < elanDesc.parameterTypes.length; i++) {
      const updatedParam = metaData.parameterTypes[i];
      if (updatedParam) {
        elanDesc.parameterTypes[i] = updatedParam;
      }
    }

    for (let i = 0; i < elanDesc.parameterTypes.length; i++) {
      if (i < parameterNames.length) {
        elanDesc.parameterNames[i] = parameterNames[i];
      } else {
        elanDesc.parameterNames[i] = `parameter${i}`;
      }
    }

    Reflect.defineMetadata(elanMetadataKey, elanDesc, target, propertyKey);
  };
}

export function elanClass(
  options?: ClassOptions,
  ofTypes?: TypeDescriptor[],
  names?: string[],
  params?: TypeDescriptor[],
  inherits?: ElanClassTypeDescriptor[],
  alias?: string,
) {
  const [isImmutable, isAbstract] = mapClassOptions(options ?? ClassOptions.concrete);
  const classDesc = new ElanClassDescriptor(
    isImmutable,
    isAbstract,
    ofTypes ?? [],
    names ?? [],
    params ?? [],
    inherits ?? [],
    alias,
  );
  return function (target: object) {
    Reflect.defineMetadata(elanMetadataKey, classDesc, target);
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

export function elanProperty(elanDesc?: TypeDescriptor) {
  return function (target: object, propertyKey: string) {
    const typeMetadata = Reflect.getMetadata("design:type", target, propertyKey);

    if (!elanDesc && typeMetadata && typeMetadata.name) {
      elanDesc = new TypescriptTypeDescriptor(typeMetadata.name);
    }

    Reflect.defineMetadata(elanMetadataKey, elanDesc, target, propertyKey);
  };
}

export function elanClassExport(cls: {
  name: string;
  prototype: object;
  emptyInstance: () => object;
}) {
  let elanDesc = ElanClass(cls) as TypeDescriptor;
  return function (target: object, propertyKey: string) {
    const typeMetadata = Reflect.getMetadata("design:type", target, propertyKey);

    if (!elanDesc && typeMetadata && typeMetadata.name) {
      elanDesc = new TypescriptTypeDescriptor(typeMetadata.name);
    }

    Reflect.defineMetadata(elanMetadataKey, elanDesc, target, propertyKey);
  };
}

export function elanType(eType: TypeDescriptor) {
  return function (target: object, propertyKey: string | symbol, parameterIndex: number) {
    const metaData: ElanMethodDescriptor =
      Reflect.getOwnMetadata(elanMetadataKey, target, propertyKey) ?? new ElanSignatureDescriptor();

    metaData.parameterTypes[parameterIndex] = eType;
    Reflect.defineMetadata(elanMetadataKey, metaData, target, propertyKey);
  };
}

export const ElanInt: ElanValueTypeDescriptor = new ElanValueTypeDescriptor("Int");
export const ElanFloat: ElanValueTypeDescriptor = new ElanValueTypeDescriptor("Float");
export const ElanString: ElanValueTypeDescriptor = new ElanValueTypeDescriptor("String");
export const ElanBoolean: ElanValueTypeDescriptor = new ElanValueTypeDescriptor("Boolean");
export const ElanRegex: ElanValueTypeDescriptor = new ElanValueTypeDescriptor("Regex");

export const ElanT1: ElanValueTypeDescriptor = new ElanGenericTypeDescriptor("T1");
export const ElanT2: ElanValueTypeDescriptor = new ElanGenericTypeDescriptor("T2");

export function ElanList(ofType: TypeDescriptor) {
  return new ElanValueTypeDescriptor("List", ofType);
}

export function ElanArray(ofType: TypeDescriptor) {
  return new ElanValueTypeDescriptor("Array", ofType);
}

export function ElanIterable(ofType: TypeDescriptor) {
  return new ElanValueTypeDescriptor("Iterable", ofType);
}

export function ElanAbstractDictionary(keyType: TypeDescriptor, valueType: TypeDescriptor) {
  return new ElanValueTypeDescriptor("AbstractDictionary", keyType, valueType);
}

export function ElanClass(cls: { name: string; prototype: object; emptyInstance: () => object }) {
  return new ElanClassTypeDescriptor(cls);
}

export function ElanImmutableDictionary(keyType: TypeDescriptor, valueType: TypeDescriptor) {
  return new ElanValueTypeDescriptor("ImmutableDictionary", keyType, valueType);
}

export function ElanDictionary(keyType: TypeDescriptor, valueType: TypeDescriptor) {
  return new ElanValueTypeDescriptor("Dictionary", keyType, valueType);
}

export function ElanTuple(ofTypes: TypeDescriptor[]) {
  return new ElanTupleTypeDescriptor(ofTypes);
}

export function ElanFunc(parameters: TypeDescriptor[], returnType: TypeDescriptor) {
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

export function elanListType(ofType: TypeDescriptor) {
  return elanType(ElanList(ofType));
}

export function elanArrayType(ofType: TypeDescriptor) {
  return elanType(ElanArray(ofType));
}

export function elanIterableType(ofType: TypeDescriptor) {
  return elanType(ElanIterable(ofType));
}

export function elanAbstractDictionaryType(keyType: TypeDescriptor, valueType: TypeDescriptor) {
  return elanType(ElanAbstractDictionary(keyType, valueType));
}

export function elanImmutableDictionaryType(keyType: TypeDescriptor, valueType: TypeDescriptor) {
  return elanType(ElanImmutableDictionary(keyType, valueType));
}

export function elanDictionaryType(keyType: TypeDescriptor, valueType: TypeDescriptor) {
  return elanType(ElanDictionary(keyType, valueType));
}

export function elanTupleType(ofTypes: TypeDescriptor[]) {
  return elanType(ElanTuple(ofTypes));
}

export function elanFuncType(parameters: TypeDescriptor[], returnType: TypeDescriptor) {
  return elanType(ElanFunc(parameters, returnType));
}

export function elanClassType(cls: {
  name: string;
  prototype: object;
  emptyInstance: () => object;
}) {
  return elanType(ElanClass(cls));
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

export enum ClassOptions {
  concrete,
  abstract,
  record,
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

function mapClassOptions(options: ClassOptions): [boolean, boolean] {
  switch (options) {
    case ClassOptions.concrete:
      return [false, false];
    case ClassOptions.abstract:
      return [false, true];
    case ClassOptions.record:
      return [true, false];
  }
}

export enum MemberType {
  property,
  function,
  procedure,
}

export function getSymbol(
  id: string,
  st: SymbolType,
  ss: SymbolScope,
  mt?: MemberType,
): ElanSymbol {
  if (st instanceof ClassType) {
    return st.scope!;
  }

  const symbol = {
    symbolId: id,
    symbolType: () => st,
    symbolScope: ss,
  } as ElanSymbol;

  if (ss === SymbolScope.member) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (symbol as any)["isMember"] = true;
  }

  if (mt === MemberType.property) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (symbol as any)["isProperty"] = true;
  }

  return symbol;
}

export function getConstantSymbol(id: string, st: SymbolType, ss: SymbolScope): ElanSymbol {
  const symbol = {
    symbolId: id,
    symbolType: () => st,
    symbolScope: ss,
  } as ElanSymbol;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (symbol as any)["isConstant"] = true;

  return symbol;
}
