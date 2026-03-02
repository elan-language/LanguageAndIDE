import { Class } from "./compiler-interfaces/class";
import { ElanSymbol } from "./compiler-interfaces/elan-symbol";
import {
  Deprecated,
  Deprecation,
  DeprecationSeverity,
  ElanDescriptor,
  elanMetadataKey,
  ElanMethodDescriptor,
  IElanFunctionDescriptor,
  IElanProcedureDescriptor,
  isConstantDescriptor,
  isFunctionDescriptor,
  isProcedureDescriptor,
  TypeDescriptor,
} from "./compiler-interfaces/elan-type-interfaces";
import { GlobalConstant } from "./compiler-interfaces/global-constant";
import { Property } from "./compiler-interfaces/property";
import { Scope } from "./compiler-interfaces/scope";
import { SymbolType } from "./compiler-interfaces/symbol-type";
import { getTypeOptions, noTypeOptions, TypeOptions } from "./compiler-interfaces/type-options";
import { ElanCompilerError } from "./elan-compiler-error";
import { constructorKeyword } from "./elan-keywords";
import { AnyType } from "./symbols/any-type";
import { BooleanType } from "./symbols/boolean-type";
import { ClassSubType, ClassType } from "./symbols/class-type";
import {
  AnyName,
  BooleanName,
  ClassName,
  FloatName,
  FuncName,
  IntName,
  RegExpName,
  StringName,
  TupleName,
} from "./symbols/elan-type-names";
import { FloatType } from "./symbols/float-type";
import { FunctionType } from "./symbols/function-type";
import { GenericParameterType } from "./symbols/generic-parameter-type";
import { IntType } from "./symbols/int-type";
import { ProcedureType } from "./symbols/procedure-type";
import { RegExpType } from "./symbols/regexp-type";
import { StdLibClass } from "./symbols/stdlib-class";
import { StringType } from "./symbols/string-type";
import { SymbolScope } from "./symbols/symbol-scope";
import { TupleType } from "./symbols/tuple-type";
import { UnknownType } from "./symbols/unknown-type";

export const nameToTypeMap = new Map<
  string,
  { name: string; prototype: object; emptyInstance: () => object }
>();

const StdLibClassCache = new Map<string, StdLibClass>();

export function stdlibClassUniqueId(name: string, ofTypes?: TypeDescriptor[]) {
  const fullName = [name];

  for (const st of ofTypes ?? []) {
    fullName.push(st.name);
  }

  return fullName.join("_");
}

export class ElanProcedureDescriptor implements IElanProcedureDescriptor {
  constructor(
    public readonly isExtension: boolean = false,
    public readonly isAsync: boolean = false,
  ) {}

  isProcedure = true;

  isPure = false;

  parameterTypes: TypeDescriptor[] = [];

  parameterNames: string[] = [];

  deprecated?: Deprecated | undefined;

  mapType(scope: Scope): SymbolType {
    const parameterTypes = this.parameterTypes;

    return new ProcedureType(
      this.parameterNames,
      parameterTypes.map((t) => t.mapType(scope)),
      this.isExtension,
      this.isAsync,
      this.deprecated,
    );
  }
}

export class ElanClassDescriptor implements ElanDescriptor {
  constructor(
    public readonly typeOptions: TypeOptions = noTypeOptions,
    public readonly ofTypes: TypeDescriptor[] = [],
    public readonly parameterNames: string[] = [],
    public readonly parameterTypes: TypeDescriptor[] = [],
    public readonly inherits: ElanClassTypeDescriptor[] = [],
    public readonly alias?: string,
  ) {}

  deprecated?: Deprecated | undefined;

  mapType(scope: Scope): SymbolType {
    const parameterTypes = this.parameterTypes;

    return new ProcedureType(
      this.parameterNames,
      parameterTypes.map((t) => t.mapType(scope)),
      false,
      false,
    );
  }
}

export class ElanFunctionDescriptor implements IElanFunctionDescriptor {
  constructor(
    public readonly isExtension: boolean = false,
    public readonly isPure: boolean = true,
    public readonly isAsync: boolean = false,
    public readonly returnType?: TypeDescriptor,
  ) {}

  isFunction = true;

  parameterTypes: TypeDescriptor[] = [];

  parameterNames: string[] = [];

  deprecated?: Deprecated | undefined;

  mapType(scope: Scope): SymbolType {
    const retType = this.returnType!;
    const parameterTypes = this.parameterTypes;

    return new FunctionType(
      this.parameterNames,
      parameterTypes.map((t) => t.mapType(scope)),
      retType.mapType(scope),
      this.isExtension,
      this.isPure,
      this.isAsync,
      this.deprecated,
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

  isGlobalConstant = true;

  mapType(_scope: Scope): SymbolType {
    switch (this.name) {
      case FloatName:
        return FloatType.Instance;
      case StringName:
        return StringType.Instance;
      case IntName:
        return IntType.Instance;
      case BooleanName:
        return BooleanType.Instance;
      case RegExpName:
        return RegExpType.Instance;
      case AnyName:
        return AnyType.Instance;
    }
    throw new Error("NotImplemented: " + this.name);
  }
}

export class ElanGenericTypeDescriptor implements TypeDescriptor {
  constructor(
    public readonly name: string,
    public readonly constraint?: TypeDescriptor,
  ) {}

  isGlobalConstant = true;

  mapType(scope: Scope): SymbolType {
    return new GenericParameterType(this.name, this.constraint?.mapType(scope));
  }
}

export class ElanFuncTypeDescriptor implements TypeDescriptor {
  constructor(
    public readonly parameters: TypeDescriptor[],
    public readonly returnType: TypeDescriptor,
  ) {}

  isGlobalConstant = true;

  name = FuncName;

  mapType(scope: Scope): SymbolType {
    return new FunctionType(
      this.parameters.map((t) => t.name),
      this.parameters.map((p) => p.mapType(scope)),
      this.returnType.mapType(scope),
      false,
      true,
      false,
      undefined,
    );
  }
}

export class ElanTupleTypeDescriptor implements TypeDescriptor {
  constructor(public readonly parameters: TypeDescriptor[]) {}

  name = TupleName;

  isGlobalConstant = true;

  mapType(scope: Scope): SymbolType {
    return new TupleType(this.parameters.map((p) => p.mapType(scope)));
  }
}

const tempMap = new Map<string, ClassType>();

function removeUnderscore(name: string) {
  return name.startsWith("_") ? name.slice(1) : name;
}

export class ElanClassTypeDescriptor implements TypeDescriptor {
  constructor(
    private readonly cls: { name: string; prototype: object; emptyInstance: () => object },
    private readonly ofTypes?: TypeDescriptor[] | undefined,
  ) {}

  isClass = true;

  name = ClassName;

  deprecated?: Deprecated | undefined;

  classId(className: string, classMetadata: ElanClassDescriptor) {
    const ofTypeNames = (this.ofTypes ?? classMetadata.ofTypes).map((td) => td.name).join("_");
    return `${className}_${ofTypeNames}`;
  }

  getNewClassTypeDef(classMetadata: ElanClassDescriptor, className: string, scope: Scope) {
    const names = Object.getOwnPropertyNames(this.cls.prototype).concat(
      Object.getOwnPropertyNames(this.cls.emptyInstance()),
    );

    const children: [string, SymbolType, MemberType][] = [];

    for (let i = 0; i < names.length; i++) {
      const name = names[i];

      const metadata = Reflect.getMetadata(elanMetadataKey, this.cls.prototype, name) as
        | ElanDescriptor
        | undefined;

      if (name === "constructor") {
        children.push([
          `__${constructorKeyword}`,
          classMetadata.mapType(scope),
          MemberType.procedure,
        ]);
      }

      if (isFunctionDescriptor(metadata)) {
        children.push([name, metadata.mapType(scope), MemberType.function]);
      }

      if (isProcedureDescriptor(metadata)) {
        children.push([name, metadata.mapType(scope), MemberType.procedure]);
      }

      if (isConstantDescriptor(metadata)) {
        children.push([name, metadata.mapType(scope), MemberType.property]);
      }
    }

    const classTypeDef = new StdLibClass(
      className,
      classMetadata.typeOptions.isAbstract,
      classMetadata.typeOptions,
      [],
      [],
      [],
      scope!,
      this.deprecated,
    );

    for (const c of children) {
      classTypeDef.children.push(getSymbol(c[0], c[1], SymbolScope.member, c[2], classTypeDef));
    }

    const actualOfTypes = this.ofTypes ?? classMetadata.ofTypes;

    for (const ot of actualOfTypes) {
      classTypeDef.ofTypes.push(ot.mapType(scope));
    }

    for (const inherits of classMetadata.inherits) {
      classTypeDef.inheritTypes.push(inherits.mapType(scope));
    }

    // cache classTypeDef
    StdLibClassCache.set(stdlibClassUniqueId(className, this.ofTypes), classTypeDef);

    return classTypeDef;
  }

  mapType(scope: Scope): SymbolType {
    const classMetadata: ElanClassDescriptor =
      Reflect.getMetadata(elanMetadataKey, this.cls) ?? new ElanClassDescriptor();

    const className = classMetadata.alias ?? removeUnderscore(this.cls.name);
    const classId = this.classId(className, classMetadata);

    if (tempMap.has(classId)) {
      return tempMap.get(classId)!;
    }

    tempMap.set(
      classId,
      new ClassType(className, ClassSubType.concrete, false, noTypeOptions, [], undefined!),
    );

    const classTypeDef =
      StdLibClassCache.get(stdlibClassUniqueId(className, this.ofTypes)) ??
      this.getNewClassTypeDef(classMetadata, className, scope!);

    const classType = tempMap.get(classId)!;
    tempMap.delete(classId);

    // update the classtype in the temp map
    return classType.updateFrom(classTypeDef.symbolType() as ClassType);
  }
}

export class ElanClassNameTypeDescriptor implements TypeDescriptor {
  constructor(
    public readonly className: string,
    private readonly ofTypes?: TypeDescriptor[] | undefined,
  ) {}

  isClass = true;

  name = ClassName;

  mapType(scope: Scope): SymbolType {
    const cls = nameToTypeMap.get(this.className);
    if (cls) {
      const td = new ElanClassTypeDescriptor(cls, this.ofTypes);
      return td.mapType(scope);
    }
    return UnknownType.Instance;
  }
}

export class TypescriptTypeDescriptor implements TypeDescriptor {
  constructor(public readonly name: string) {}

  isGlobalConstant = true;

  mapType(_scope: Scope): SymbolType {
    switch (this.name) {
      case "Number":
        return FloatType.Instance;
      case "String":
        return StringType.Instance;
      case "Boolean":
        return BooleanType.Instance;
      case "RegExp":
        return RegExpType.Instance;
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
  return function (target: object, propertyKey: string, _descriptor: PropertyDescriptor) {
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
  option?: ClassOption,
  ofTypes?: TypeDescriptor[],
  names?: string[],
  params?: TypeDescriptor[],
  inherits?: ElanClassTypeDescriptor[],
  alias?: string,
) {
  const typeOptions = mapClassOption(option ?? ClassOption.concrete);
  const classDesc = new ElanClassDescriptor(
    typeOptions,
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
  nameToTypeMap.set(cls.name, cls);
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

function getDeprecated(
  reason: Deprecation,
  fromMajor: number,
  fromMinor: number,
  message: string,
  advisory: DeprecationSeverity,
) {
  return {
    reason: reason,
    fromMajor: fromMajor,
    fromMinor: fromMinor,
    message: message,
    Severity: advisory,
  } as Deprecated;
}

export function elanDeprecated(
  reason: Deprecation,
  fromMajor: number,
  fromMinor: number,
  message: string,
  severity: DeprecationSeverity = DeprecationSeverity.error,
) {
  return function (
    target: object,
    propertyKey: string,
    propertyDescriptor?: PropertyDescriptor | undefined,
  ) {
    if (propertyDescriptor) {
      const metaData: ElanMethodDescriptor =
        Reflect.getOwnMetadata(elanMetadataKey, target, propertyKey) ??
        new ElanSignatureDescriptor();

      metaData.deprecated = getDeprecated(reason, fromMajor, fromMinor, message, severity);

      Reflect.defineMetadata(elanMetadataKey, metaData, target, propertyKey);
    } else {
      const typeMetadata = Reflect.getMetadata(elanMetadataKey, target, propertyKey);

      if (typeMetadata) {
        typeMetadata.deprecated = getDeprecated(reason, fromMajor, fromMinor, message, severity);

        Reflect.defineMetadata(elanMetadataKey, typeMetadata, target, propertyKey);
      }
    }
  };
}

export const ElanAny: ElanValueTypeDescriptor = new ElanValueTypeDescriptor(AnyName);
export const ElanInt: ElanValueTypeDescriptor = new ElanValueTypeDescriptor(IntName);
export const ElanFloat: ElanValueTypeDescriptor = new ElanValueTypeDescriptor(FloatName);
export const ElanString: ElanValueTypeDescriptor = new ElanValueTypeDescriptor(StringName);
export const ElanBoolean: ElanValueTypeDescriptor = new ElanValueTypeDescriptor(BooleanName);
export const ElanRegExp: ElanValueTypeDescriptor = new ElanValueTypeDescriptor(RegExpName);

export const ElanT1: ElanValueTypeDescriptor = new ElanGenericTypeDescriptor("T1");
export const ElanT2: ElanValueTypeDescriptor = new ElanGenericTypeDescriptor("T2");

export function ElanT1Constrained(constraint: TypeDescriptor) {
  return new ElanGenericTypeDescriptor("T1", constraint);
}

export function ElanT2Constrained(constraint: TypeDescriptor) {
  return new ElanGenericTypeDescriptor("T2", constraint);
}

export function ElanClass(
  cls: { name: string; prototype: object; emptyInstance: () => object },
  ofTypes?: TypeDescriptor[],
) {
  return new ElanClassTypeDescriptor(cls, ofTypes);
}

export function ElanClassName(className: string, _ofTypes?: TypeDescriptor[]) {
  return new ElanClassNameTypeDescriptor(className);
}

export function ElanTuple(ofTypes: TypeDescriptor[]) {
  return new ElanTupleTypeDescriptor(ofTypes);
}

export function ElanFunc(parameters: TypeDescriptor[], returnType: TypeDescriptor) {
  return new ElanFuncTypeDescriptor(parameters, returnType);
}

export function elanAnyType() {
  return elanType(ElanAny);
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
  return elanType(ElanRegExp);
}

export function elanGenericParamT1Type(constraint?: TypeDescriptor) {
  return elanType(constraint ? ElanT1Constrained(constraint) : ElanT1);
}

export function elanGenericParamT2Type(constraint?: TypeDescriptor) {
  return elanType(constraint ? ElanT2Constrained(constraint) : ElanT2);
}

export function elanTupleType(ofTypes: TypeDescriptor[]) {
  return elanType(ElanTuple(ofTypes));
}

export function elanFuncType(parameters: TypeDescriptor[], returnType: TypeDescriptor) {
  return elanType(ElanFunc(parameters, returnType));
}

export function elanClassType(
  cls: {
    name: string;
    prototype: object;
    emptyInstance: () => object;
  },
  ofTypes?: TypeDescriptor[],
) {
  return elanType(ElanClass(cls, ofTypes));
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

export enum ClassOption {
  concrete,
  abstract,
  record,
  list,
  dictionary,
}

// isExtension, isPure, isASync, retType
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
      return [false, true, true, retType];
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

function mapClassOption(options: ClassOption): TypeOptions {
  const opt = getTypeOptions();

  switch (options) {
    case ClassOption.concrete:
      return opt;
    case ClassOption.abstract:
      opt.isAbstract = true;
      return opt;
    case ClassOption.record:
      opt.isImmutable = true;
      return opt;
    case ClassOption.list:
      opt.isIndexable = opt.isIterable = true;
      return opt;
    case ClassOption.dictionary:
      opt.isIndexable = true;
      return opt;
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
  cls?: Class,
): ElanSymbol {
  if (st instanceof ClassType) {
    return st.scope!;
  }

  let symbol: ElanSymbol;

  if (ss === SymbolScope.member) {
    symbol = {
      symbolId: id,
      symbolType: () => st,
      symbolScope: ss,
      isMember: true,
      private: false,
      isAbstract: false,
      getClass: () => cls,
    } as ElanSymbol;
  } else {
    symbol = {
      symbolId: id,
      symbolType: () => st,
      symbolScope: ss,
    } as ElanSymbol;
  }

  if (mt === MemberType.property) {
    (symbol as Property)["isProperty"] = true;
  }

  return symbol;
}

export function getConstantSymbol(id: string, st: SymbolType, ss: SymbolScope): GlobalConstant {
  const symbol = {
    symbolId: id,
    symbolType: () => st,
    symbolScope: ss,
    isGlobalConstant: true,
  } as GlobalConstant;

  return symbol;
}
