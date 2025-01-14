import { Property } from "./class-members/property";
import {
  CannotCallAFunction,
  CannotCallAsAMethod,
  CannotUseLikeAFunction,
  CannotUseSystemMethodInAFunction,
  CompileError,
  DuplicateKeyCompileError,
  ExtensionCompileError,
  ExtraParameterCompileError,
  FunctionRefCompileError,
  MemberTypeCompileError,
  MissingParameterCompileError,
  MustBeAbstractCompileError,
  MustBeConcreteCompileError,
  MustBeInterfaceCompileError,
  MustBeRecordCompileError,
  MustBeSingleAbstractCompileError,
  MustImplementCompileError,
  MustNotBeCircularDependencyCompileError,
  MutateCompileError,
  NotIndexableCompileError,
  NotIterableCompileError,
  NotNewableCompileError,
  NotRangeableCompileError,
  NotUniqueNameCompileError,
  OutParameterCompileError,
  ParametersCompileError,
  ParameterTypesCompileError,
  PrivateMemberCompileError,
  ReassignInFunctionCompileError,
  RedefinedCompileError,
  SignatureCompileError,
  SyntaxCompileError,
  TypeCompileError,
  TypesCompileError,
  UndefinedSymbolCompileError,
  UnknownCompilerDirectiveCompileError,
} from "./compile-error";
import {
  isClass,
  isConstant,
  isFunction,
  isInsideFunction,
  isInsideFunctionOrConstructor,
  isLet,
  isMember,
  isProcedure,
} from "./frame-helpers";
import { AstNode } from "./interfaces/ast-node";
import { ElanSymbol } from "./interfaces/elan-symbol";
import { Parent } from "./interfaces/parent";
import { Scope } from "./interfaces/scope";
import { SymbolType } from "./interfaces/symbol-type";
import { allKeywords, reservedWords } from "./keywords";
import { LetStatement } from "./statements/let-statement";
import { AbstractDictionaryType } from "./symbols/abstract-dictionary-type";
import { ArrayType } from "./symbols/array-type";
import { BooleanType } from "./symbols/boolean-type";
import { ClassSubType, ClassType } from "./symbols/class-type";
import { DeconstructedListType } from "./symbols/deconstructed-list-type";
import { DeconstructedTupleType } from "./symbols/deconstructed-tuple-type";
import { DictionaryImmutableType } from "./symbols/dictionary-immutable-type";
import { DictionaryType } from "./symbols/dictionary-type";
import { DuplicateSymbol } from "./symbols/duplicate-symbol";
import { EnumType } from "./symbols/enum-type";
import { FloatType } from "./symbols/float-type";
import { FunctionType } from "./symbols/function-type";
import { GenericParameterType } from "./symbols/generic-parameter-type";
import { IntType } from "./symbols/int-type";
import { IterableType } from "./symbols/iterable-type";
import { ListType } from "./symbols/list-type";
import { ProcedureType } from "./symbols/procedure-type";
import { RegExpType } from "./symbols/regexp-type";
import { StringType } from "./symbols/string-type";
import {
  isAnyDictionaryType,
  isClassTypeDef,
  isDeconstructedType,
  isGenericSymbolType,
  isIndexableType,
  isIterableType,
  isListType,
  isProperty,
  symbolScopeToFriendlyName,
} from "./symbols/symbol-helpers";
import { SymbolScope } from "./symbols/symbol-scope";
import { TupleType } from "./symbols/tuple-type";
import { UnknownSymbol } from "./symbols/unknown-symbol";
import { UnknownType } from "./symbols/unknown-type";
import {
  getIds,
  InFunctionScope,
  isAstIdNode,
  isAstIndexableNode,
  transforms,
} from "./syntax-nodes/ast-helpers";
import { Transforms } from "./syntax-nodes/transforms";

export function mustBeOfSymbolType(
  exprType: SymbolType | undefined,
  ofType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  const unknown = exprType?.name === undefined || ofType.name === undefined;
  if (exprType?.name !== ofType.name) {
    compileErrors.push(new TypeCompileError(ofType.name, location, unknown));
  }
}

export function mustBeMemberOfSymbolType(
  name: string,
  exprType: SymbolType | undefined,
  ofType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  const unknown = exprType?.name === undefined || ofType.name === undefined;
  if (exprType?.name !== ofType.name) {
    compileErrors.push(new MemberTypeCompileError(name, ofType.name, location, unknown));
  }
}

export function mustBeOfType(
  expr: AstNode | undefined,
  ofType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  mustBeOfSymbolType(expr?.symbolType(), ofType, compileErrors, location);
}

export function mustNotHaveConditionalAfterUnconditionalElse(
  elses: { hasIf: boolean }[],
  compileErrors: CompileError[],
  location: string,
) {
  const unconditionals = elses.filter((s) => !s.hasIf).length;
  if (unconditionals > 1 || (unconditionals === 1 && elses[elses.length - 1].hasIf)) {
    compileErrors.push(
      new SyntaxCompileError(`Cannot have any clause after unconditional 'else'`, location),
    );
  }
}

export function mustBeKnownSymbol(
  symbol: ElanSymbol,
  scope: Scope | undefined,
  compileErrors: CompileError[],
  location: string,
) {
  if (symbol instanceof UnknownSymbol) {
    const type = isClass(scope) ? scope.symbolId : "";
    compileErrors.push(new UndefinedSymbolCompileError(symbol.symbolId, type, location));
  }
}

export function mustBeKnownSymbolType(
  symbolType: SymbolType,
  originalName: string,
  compileErrors: CompileError[],
  location: string,
) {
  if (symbolType instanceof UnknownType) {
    compileErrors.push(new UndefinedSymbolCompileError(originalName, "", location));
  }
}

export function mustBeRecord(
  symbolType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (!symbolType.isImmutable) {
    compileErrors.push(
      new MustBeRecordCompileError(symbolType.name, location, symbolType instanceof UnknownType),
    );
  }
}

export function mustNotBeKeyword(id: string, compileErrors: CompileError[], location: string) {
  if (allKeywords.includes(id)) {
    compileErrors.push(
      new SyntaxCompileError(
        `'${id}' is a keyword, and may not be used as an identifier`,
        location,
      ),
    );
  }
  if (reservedWords.includes(id)) {
    compileErrors.push(
      new SyntaxCompileError(
        `'${id}' is a reserved word, and may not be used as an identifier`,
        location,
      ),
    );
  }
}

export function mustBeProcedure(
  symbolType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (!(symbolType instanceof ProcedureType)) {
    compileErrors.push(new CannotCallAFunction(location, symbolType instanceof UnknownType));
  }
}

export function mustBeRecordType(
  symbolType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (!(symbolType instanceof ClassType)) {
    compileErrors.push(new TypeCompileError("record", location, symbolType instanceof UnknownType));
  }
}

export function mustBeDeconstructableType(
  symbolType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (!isDeconstructedType(symbolType)) {
    compileErrors.push(
      new TypeCompileError("able to be deconstructed", location, symbolType instanceof UnknownType),
    );
  }
}

export function mustBePureFunctionSymbol(
  symbolId: string,
  symbolType: SymbolType,
  symbolScope: SymbolScope,
  scope: Scope,
  compileErrors: CompileError[],
  location: string,
) {
  if (InFunctionScope(scope)) {
    if (!(symbolType instanceof FunctionType) || !symbolType.isPure) {
      compileErrors.push(
        new CannotUseSystemMethodInAFunction(location, symbolType instanceof UnknownType),
      );
    }
  } else if (symbolType instanceof ProcedureType) {
    compileErrors.push(
      new CannotUseLikeAFunction(symbolId, location, symbolType instanceof UnknownType),
    );
  } else if (!(symbolType instanceof FunctionType)) {
    compileErrors.push(
      new CannotCallAsAMethod(
        symbolId,
        symbolScopeToFriendlyName(symbolScope),
        location,
        symbolType instanceof UnknownType,
      ),
    );
  }
}

export function mustBeIndexableSymbol(
  symbolId: string,
  symbolType: SymbolType,
  read: boolean,
  compileErrors: CompileError[],
  location: string,
) {
  if (symbolType instanceof UnknownType) {
    compileErrors.push(new UndefinedSymbolCompileError(symbolId, "", location));
  } else if (!(read && (isIndexableType(symbolType) || isAnyDictionaryType(symbolType)))) {
    compileErrors.push(new NotIndexableCompileError(symbolType.name, location, false));
  }
}

export function mustBeRangeableSymbol(
  symbolType: SymbolType,
  read: boolean,
  compileErrors: CompileError[],
  location: string,
) {
  if (!(read && isIndexableType(symbolType))) {
    compileErrors.push(
      new NotRangeableCompileError(symbolType.name, location, symbolType instanceof UnknownType),
    );
  }
}

export function mustBeInheritableClassOrInterface(
  type: SymbolType,
  name: string,
  compileErrors: CompileError[],
  location: string,
) {
  if (
    !(type instanceof ClassType) ||
    type.subType === ClassSubType.concrete ||
    type.isNotInheritable
  ) {
    compileErrors.push(new MustBeAbstractCompileError(name, location));
  }
}

export function mustBeInterfaceClass(
  type: SymbolType,
  name: string,
  compileErrors: CompileError[],
  location: string,
) {
  if (
    !(type instanceof ClassType) ||
    type.subType !== ClassSubType.interface ||
    type.isNotInheritable
  ) {
    compileErrors.push(new MustBeInterfaceCompileError(name, location));
  }
}

export function mustNotBeCircularDependency(
  name: string,
  compileErrors: CompileError[],
  location: string,
) {
  compileErrors.push(new MustNotBeCircularDependencyCompileError(name, location));
}

export function mustBeSingleAbstractSuperClass(
  typeAndName: [SymbolType, string][],
  compileErrors: CompileError[],
  location: string,
) {
  const names = [];

  for (const [st, name] of typeAndName) {
    if (st instanceof ClassType) {
      if (st.subType === ClassSubType.abstract) {
        names.push(name);
      }
    }
  }

  if (names.length > 1) {
    compileErrors.push(new MustBeSingleAbstractCompileError(names, location));
  }
}

export function mustBePublicMember(
  member: ElanSymbol,
  compileErrors: CompileError[],
  location: string,
) {
  if (isMember(member) && member.private) {
    compileErrors.push(new PrivateMemberCompileError(member.symbolId, location));
  }
}

export function mustBePropertyAndPublic(
  symbol: ElanSymbol,
  compileErrors: CompileError[],
  location: string,
) {
  if (symbol instanceof Property && symbol.private === true) {
    compileErrors.push(new PrivateMemberCompileError(symbol.name.text, location));
  }
  if (symbol.symbolScope !== SymbolScope.member) {
    compileErrors.push(new UndefinedSymbolCompileError(symbol.symbolId, "", location));
  }
}

export function mustImplementSuperClasses(
  transforms: Transforms,
  classType: ClassType,
  superClassTypes: ClassType[],
  compileErrors: CompileError[],
  location: string,
) {
  for (const superClassType of superClassTypes) {
    const superSymbols = superClassType.childSymbols();

    for (const superSymbol of superSymbols.filter((ss) => isMember(ss) && ss.isAbstract)) {
      const subSymbol = classType.resolveSymbol(superSymbol.symbolId, transforms, classType);

      if (
        subSymbol instanceof UnknownSymbol ||
        (isMember(subSymbol) && subSymbol.isAbstract) ||
        (isMember(subSymbol) && subSymbol.private)
      ) {
        compileErrors.push(
          new MustImplementCompileError(
            classType.name,
            superClassType.name,
            superSymbol.symbolId,
            location,
          ),
        );
      } else {
        mustBeMemberOfSymbolType(
          superSymbol.symbolId,
          subSymbol.symbolType(transforms),
          superSymbol.symbolType(transforms),
          compileErrors,
          location,
        );
      }
    }
  }
}

export function mustBeConcreteClass(
  classType: ClassType,
  compileErrors: CompileError[],
  location: string,
) {
  if (classType.subType !== ClassSubType.concrete) {
    compileErrors.push(new MustBeConcreteCompileError(classType.name, location));
  }
}

export function mustBeClass(symbol: ElanSymbol, compileErrors: CompileError[], location: string) {
  if (!isClass(symbol)) {
    const st = symbol.symbolType();
    const unknown = st instanceof UnknownType;
    compileErrors.push(new TypeCompileError("Class", location, unknown));
  }
}

export function mustCallExtensionViaQualifier(
  ft: FunctionType | ProcedureType,
  qualifier: AstNode | undefined,
  compileErrors: CompileError[],
  location: string,
) {
  if (ft.isExtension && qualifier === undefined) {
    compileErrors.push(new ExtensionCompileError(location));
  }
}

export function mustMatchParameters(
  parms: AstNode[],
  ofType: SymbolType[],
  description: string,
  isExtension: boolean,
  compileErrors: CompileError[],
  location: string,
) {
  const extensionOfType = isExtension ? ofType[0] : undefined;
  const extensionParm = isExtension ? parms[0] : undefined;

  ofType = isExtension ? ofType.slice(1) : ofType;
  parms = isExtension ? parms.slice(1) : parms;

  const expected = ofType.length;
  const actual = parms.length;

  if (expected > actual) {
    compileErrors.push(new MissingParameterCompileError(description, location));
  }

  if (actual > expected) {
    compileErrors.push(new ExtraParameterCompileError(description, location));
  }

  if (extensionParm && extensionOfType) {
    mustBeCompatibleType(extensionOfType, extensionParm.symbolType(), compileErrors, location);
  }

  const maxLen = parms.length > ofType.length ? parms.length : ofType.length;
  const tempErrors: CompileError[] = [];
  const parmTypes = parms.map((p) => p.symbolType());

  for (let i = 0; i < maxLen; i++) {
    const p = parmTypes[i];
    const t = ofType[i];
    if (p && t) {
      mustBeCompatibleType(t, p, tempErrors, location);
    }
  }

  if (tempErrors.length > 0) {
    const provided = parmTypes.map((pt) => pt.name).join(", ");
    compileErrors.push(new ParameterTypesCompileError(description, provided, location));
  }
}

export function mustMatchGenericParameters(
  parms: AstNode[],
  expected: number,
  compileErrors: CompileError[],
  location: string,
) {
  if (parms.length !== expected) {
    compileErrors.push(new ParametersCompileError(expected, parms.length, location, true));
  }
}

function FailIncompatible(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  let addInfo = "";
  // special case
  if (lhs instanceof ListType && rhs instanceof ArrayType) {
    addInfo = " try converting with '.asList()'";
  }

  if (isListType(lhs) && rhs instanceof IterableType) {
    addInfo = " try converting Iterable to a concrete type with e.g. '.asList()'";
  }

  const unknown = lhs === UnknownType.Instance || rhs === UnknownType.Instance;
  if (!unknown) {
    compileErrors.push(new TypesCompileError(rhs.name, lhs.name, addInfo, location, false));
  }
}

function FailNotNumber(lhs: SymbolType, compileErrors: CompileError[], location: string) {
  const unknown = lhs === UnknownType.Instance;
  if (!unknown) {
    compileErrors.push(new TypesCompileError(lhs.name, "Float or Int", "", location, false));
  }
}

function FailCannotCompareProcFunc(compileErrors: CompileError[], location: string) {
  compileErrors.push(
    new SyntaxCompileError("Cannot do equality operations on Procedures or Functions", location),
  );
}

export function mustBeCoercibleType(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  // for compare allow int and floats
  if (isNumber(lhs) && isNumber(rhs)) {
    return;
  }

  // disallow comparing Procedures and Functions
  if (
    lhs instanceof ProcedureType ||
    lhs instanceof FunctionType ||
    rhs instanceof ProcedureType ||
    rhs instanceof FunctionType
  ) {
    FailCannotCompareProcFunc(compileErrors, location);
  }

  mustBeCompatibleType(lhs, rhs, compileErrors, location);
}

export function mustBeNumberType(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (!isNumber(lhs)) {
    FailNotNumber(lhs, compileErrors, location);
  }
  if (!isNumber(rhs)) {
    FailNotNumber(rhs, compileErrors, location);
  }
}

export function mustBeBooleanType(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  mustBeCompatibleType(BooleanType.Instance, lhs, compileErrors, location);
  mustBeCompatibleType(BooleanType.Instance, rhs, compileErrors, location);
}

export function mustBeIntegerType(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  mustBeCompatibleType(IntType.Instance, lhs, compileErrors, location);
  mustBeCompatibleType(IntType.Instance, rhs, compileErrors, location);
}

function mustBeCompatibleTypes(
  lhss: SymbolType[],
  rhss: SymbolType[],
  compileErrors: CompileError[],
  location: string,
) {
  if (lhss.length !== rhss.length) {
    compileErrors.push(new ParametersCompileError(rhss.length, lhss.length, location));
  }

  const maxLen = lhss.length > rhss.length ? lhss.length : rhss.length;
  for (let i = 0; i < maxLen; i++) {
    mustBeCompatibleType(
      lhss[i] ?? UnknownType.Instance,
      rhss[i] ?? UnknownType.Instance,
      compileErrors,
      location,
    );
  }
  return;
}

function mustBeCompatibleSignatures(
  lhss: SymbolType[],
  rhss: SymbolType[],
  compileErrors: CompileError[],
  location: string,
) {
  if (lhss.length !== rhss.length) {
    compileErrors.push(new SignatureCompileError(lhss.length, rhss.length, location));
  }

  const maxLen = lhss.length > rhss.length ? lhss.length : rhss.length;
  for (let i = 0; i < maxLen; i++) {
    mustBeCompatibleType(
      lhss[i] ?? UnknownType.Instance,
      rhss[i] ?? UnknownType.Instance,
      compileErrors,
      location,
    );
  }
  return;
}

export function mustBeCompatibleMutableType(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (lhs.isImmutable !== rhs.isImmutable) {
    FailIncompatible(lhs, rhs, compileErrors, location);
  }
}

export function mustBeImmutableType(
  name: string,
  type: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (!type.isImmutable) {
    compileErrors.push(
      new SyntaxCompileError(`Property ${name} is not of an immutable type.`, location),
    );
  }
}

function isNumber(st: SymbolType) {
  return st instanceof IntType || st instanceof FloatType;
}

export function isInvariantType(lhs: SymbolType, rhs: SymbolType, immutable: boolean) {
  if (lhs instanceof FloatType && immutable && isNumber(rhs)) {
    // OK Float/Int -> Float on immutable
    return true;
  }

  return lhs.name === rhs.name;
}

export function mustBeCompatibleType(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (lhs instanceof RegExpType && !(rhs instanceof RegExpType)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }
  if (lhs instanceof BooleanType && !(rhs instanceof BooleanType)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }
  if (lhs instanceof StringType && !(rhs instanceof StringType)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }
  if (lhs instanceof IntType && !(rhs instanceof IntType)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }
  if (lhs instanceof FloatType && !isNumber(rhs)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (lhs instanceof ListType && rhs instanceof ListType) {
    if (!isInvariantType(lhs.ofType, rhs.ofType, true)) {
      FailIncompatible(lhs, rhs, compileErrors, location);
    }
    return;
  }

  if (lhs instanceof ListType && !(rhs instanceof ListType)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (lhs instanceof ArrayType && rhs instanceof ArrayType) {
    if (!isInvariantType(lhs.ofType, rhs.ofType, true)) {
      FailIncompatible(lhs, rhs, compileErrors, location);
    }
    return;
  }

  if (lhs instanceof ArrayType && !(rhs instanceof ArrayType)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (lhs instanceof DictionaryType && rhs instanceof DictionaryType) {
    if (!isInvariantType(lhs.keyType, rhs.keyType, true)) {
      FailIncompatible(lhs, rhs, compileErrors, location);
    }
    if (!isInvariantType(lhs.valueType, rhs.valueType, true)) {
      FailIncompatible(lhs, rhs, compileErrors, location);
    }
    return;
  }

  if (lhs instanceof DictionaryType && !(rhs instanceof DictionaryType)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (lhs instanceof DictionaryImmutableType && rhs instanceof DictionaryImmutableType) {
    if (!isInvariantType(lhs.keyType, rhs.keyType, true)) {
      FailIncompatible(lhs, rhs, compileErrors, location);
    }
    if (!isInvariantType(lhs.valueType, rhs.valueType, true)) {
      FailIncompatible(lhs, rhs, compileErrors, location);
    }
    return;
  }

  if (lhs instanceof DictionaryImmutableType && !(rhs instanceof DictionaryImmutableType)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (lhs instanceof AbstractDictionaryType && isAnyDictionaryType(rhs)) {
    if (!isInvariantType(lhs.keyType, rhs.keyType, true)) {
      FailIncompatible(lhs, rhs, compileErrors, location);
    }
    if (!isInvariantType(lhs.valueType, rhs.valueType, true)) {
      FailIncompatible(lhs, rhs, compileErrors, location);
    }
    return;
  }

  if (lhs instanceof AbstractDictionaryType && !isAnyDictionaryType(rhs)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (
    (lhs instanceof TupleType || lhs instanceof DeconstructedTupleType) &&
    rhs instanceof TupleType
  ) {
    if (lhs.ofTypes.length === rhs.ofTypes.length) {
      mustBeCompatibleTypes(lhs.ofTypes, rhs.ofTypes, compileErrors, location);
    } else {
      if (lhs instanceof DeconstructedTupleType) {
        compileErrors.push(
          new SyntaxCompileError(`Wrong number of deconstructed variables`, location),
        );
      } else {
        FailIncompatible(lhs, rhs, compileErrors, location);
      }
    }
  }

  if (
    (lhs instanceof TupleType || lhs instanceof DeconstructedTupleType) &&
    !(rhs instanceof TupleType)
  ) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (lhs instanceof IterableType && !isIterableType(rhs)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (lhs instanceof IterableType && isIterableType(rhs)) {
    if (!isInvariantType(lhs.ofType, rhs.ofType, true)) {
      FailIncompatible(lhs, rhs, compileErrors, location);
    }
    return;
  }

  if (lhs instanceof EnumType && rhs instanceof EnumType) {
    if (lhs.name !== rhs.name) {
      FailIncompatible(lhs, rhs, compileErrors, location);
      return;
    }
  }

  if (lhs instanceof EnumType && !(rhs instanceof EnumType)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (rhs instanceof EnumType && !(lhs instanceof EnumType)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (lhs instanceof ClassType) {
    if (lhs.isAssignableFrom(rhs)) {
      return;
    }
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (
    (lhs instanceof FunctionType && !(rhs instanceof FunctionType)) ||
    (rhs instanceof FunctionType && !(lhs instanceof FunctionType))
  ) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (lhs instanceof FunctionType && rhs instanceof FunctionType) {
    mustBeCompatibleSignatures(lhs.parameterTypes, rhs.parameterTypes, compileErrors, location);
    mustBeCompatibleType(lhs.returnType, rhs.returnType, compileErrors, location);
    return;
  }

  if (lhs instanceof GenericParameterType && rhs instanceof GenericParameterType) {
    if (lhs.name !== rhs.name) {
      FailIncompatible(lhs, rhs, compileErrors, location);
    }
    return;
  }

  if (lhs instanceof DeconstructedListType) {
    if (isGenericSymbolType(lhs.tailType)) {
      mustBeCompatibleType(lhs.headType, lhs.tailType.ofType, compileErrors, location);
    }

    mustBeCompatibleType(lhs.tailType, rhs, compileErrors, location);

    if (isGenericSymbolType(rhs)) {
      mustBeCompatibleType(lhs.headType, rhs.ofType, compileErrors, location);
    }

    return;
  }

  if (lhs instanceof GenericParameterType || rhs instanceof GenericParameterType) {
    FailIncompatible(lhs, rhs, compileErrors, location);
  }
}

function mustBeCompatibleDeconstruction(
  lhs: AstNode,
  rhs: AstNode,
  scope: Scope,
  compileErrors: CompileError[],
  location: string,
) {
  const ids = getIds(lhs);
  const lst = lhs.symbolType() as TupleType;
  const rst = rhs.symbolType() as ClassType;

  const classDef = scope.resolveSymbol(rst.name, transforms(), scope);

  if (isClassTypeDef(classDef)) {
    const childSymbols = classDef.getChildren().filter((s) => isProperty(s));

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      if (childSymbols.map((s) => s.symbolId).includes(id)) {
        const llst = lst.ofTypes[i];
        const rrst = childSymbols.find((s) => s.symbolId === id)!.symbolType(transforms());

        mustBeCompatibleType(llst, rrst, compileErrors, location);
      } else {
        const msg = id
          ? `No such property '${id}' on record '${rst.name}`
          : "Cannot discard in record deconstruction";
        compileErrors.push(new SyntaxCompileError(msg, location));
      }
    }
  }
}

export function mustBeCompatibleDefinitionNode(
  lhs: AstNode,
  rhs: AstNode,
  scope: Scope,
  compileErrors: CompileError[],
  location: string,
) {
  const lst = lhs.symbolType();
  const rst = rhs.symbolType();

  if (lst instanceof DeconstructedTupleType) {
    if (rst instanceof ClassType && rst.isImmutable) {
      mustBeCompatibleDeconstruction(lhs, rhs, scope, compileErrors, location);
    }
    if (rst instanceof TupleType && lst.ofTypes.length !== rst.ofTypes.length) {
      compileErrors.push(
        new SyntaxCompileError(`Wrong number of deconstructed variables`, location),
      );
    }
  }
}

export function mustBeCompatibleNode(
  lhs: AstNode,
  rhs: AstNode,
  scope: Scope,
  compileErrors: CompileError[],
  location: string,
) {
  const lst = lhs.symbolType();
  const rst = rhs.symbolType();

  if (lst instanceof DeconstructedTupleType && rst instanceof ClassType) {
    if (rst.isImmutable) {
      mustBeCompatibleDeconstruction(lhs, rhs, scope, compileErrors, location);
      return;
    }
  }

  mustBeCompatibleType(lst, rst, compileErrors, location);
}

export function getId(astNode: AstNode) {
  if (isAstIdNode(astNode)) {
    return astNode.id;
  }
  return "unknown";
}

export function mustNotBePropertyOnFunctionMethod(
  assignable: AstNode,
  parent: Parent,
  compileErrors: CompileError[],
  location: string,
) {
  if (isInsideFunction(parent)) {
    const s = assignable.symbolScope;

    if (s === SymbolScope.member) {
      compileErrors.push(
        new ReassignInFunctionCompileError(`property: ${getId(assignable)}`, location),
      );
    }
  }
}

export function mustBePropertyPrefixedOnMember(compileErrors: CompileError[], location: string) {
  compileErrors.push(new SyntaxCompileError(`referencing a property requires a prefix`, location));
}

function isIndexed(assignable: AstNode) {
  if (isAstIndexableNode(assignable)) {
    const rst = assignable.rootSymbolType();
    const st = assignable.symbolType();
    return rst.name !== st.name;
  }
  return false;
}

export function mustNotBeParameter(
  assignable: AstNode,
  parent: Parent,
  compileErrors: CompileError[],
  location: string,
) {
  const s = assignable.symbolScope;

  if (s === SymbolScope.parameter) {
    if (isInsideFunctionOrConstructor(parent)) {
      compileErrors.push(new MutateCompileError(getId(assignable), "parameter", location));
    } else {
      // only mutate indexed Array
      if (!isIndexed(assignable)) {
        compileErrors.push(new MutateCompileError(getId(assignable), "parameter", location));
      }
    }
  }
}

export function cannotCallOnParameter(
  assignable: AstNode,
  compileErrors: CompileError[],
  location: string,
) {
  compileErrors.push(new MutateCompileError(getId(assignable), "parameter", location));
}

export function mustNotBeCounter(
  assignable: AstNode,
  compileErrors: CompileError[],
  location: string,
) {
  const s = assignable.symbolScope;

  if (s === SymbolScope.counter) {
    compileErrors.push(new MutateCompileError(getId(assignable), "loop counter", location));
  }
}

export function mustNotBeConstant(
  assignable: AstNode,
  compileErrors: CompileError[],
  location: string,
) {
  const s = assignable.symbolScope;

  if (s === SymbolScope.program) {
    compileErrors.push(new MutateCompileError(getId(assignable), "constant", location));
  }
}

export function cannotPassAsOutParameter(
  parameter: AstNode | string,
  compileErrors: CompileError[],
  location: string,
) {
  if (typeof parameter === "string") {
    compileErrors.push(new OutParameterCompileError(parameter, location, false));
  } else {
    const unknown = parameter.symbolType() === UnknownType.Instance;
    compileErrors.push(new OutParameterCompileError(parameter.toString(), location, unknown));
  }
}

export function mustBeUniqueNameInScope(
  name: string,
  scope: Scope,
  transforms: Transforms,
  compileErrors: CompileError[],
  location: string,
) {
  const symbol = scope.resolveSymbol(name, transforms, scope);

  if (symbol instanceof DuplicateSymbol) {
    let postFix = "";
    if (
      symbol.duplicates.length ===
      symbol.duplicates.filter((s) => isMember(s) && s.isAbstract).length
    ) {
      postFix = ". Suggestion: factor out the common member(s) into a higher level interface.";
    }

    compileErrors.push(new NotUniqueNameCompileError(name, postFix, location));
  }
}

export function mustBeUniqueValueInScope(
  name: string,
  compileErrors: CompileError[],
  location: string,
) {
  compileErrors.push(new NotUniqueNameCompileError(name, "", location));
}

export function mustNotBeLet(symbol: ElanSymbol, compileErrors: CompileError[], location: string) {
  if (symbol instanceof LetStatement) {
    compileErrors.push(new MutateCompileError(symbol.symbolId, mapToPurpose(symbol), location));
  }
}

function mapToPurpose(symbol: ElanSymbol) {
  if (symbol.symbolScope === SymbolScope.parameter) {
    return "parameter";
  }

  if (isConstant(symbol)) {
    return "constant";
  }

  if (isFunction(symbol)) {
    return "function";
  }

  if (isProcedure(symbol)) {
    return "procedure";
  }

  if (isLet(symbol)) {
    return "'let'";
  }

  return "variable";
}

export function mustNotBeRedefined(
  variable: ElanSymbol,
  compileErrors: CompileError[],
  location: string,
) {
  if (
    variable instanceof UnknownSymbol ||
    variable.symbolScope === SymbolScope.member ||
    variable.symbolScope === SymbolScope.program ||
    variable.symbolScope === SymbolScope.stdlib
  ) {
    // ok
    return;
  }
  compileErrors.push(
    new RedefinedCompileError(variable.symbolId, mapToPurpose(variable), location),
  );
}

export function mustNotBeOutParameter(compileErrors: CompileError[], location: string) {
  compileErrors.push(
    new SyntaxCompileError("'out' parameters are only supported on procedures.", location),
  );
}

export function mustNotHaveDuplicateMain(compileErrors: CompileError[], location: string) {
  compileErrors.push(
    new SyntaxCompileError("There can only be one 'main' in a program.", location),
  );
}

export function mustBeIterable(
  symbolType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (!isIterableType(symbolType)) {
    compileErrors.push(
      new NotIterableCompileError(symbolType.name, location, symbolType instanceof UnknownType),
    );
  }
}

export function mustHaveUniqueKeys(
  keys: string[],
  compileErrors: CompileError[],
  location: string,
) {
  const set = new Set(keys);
  if (set.size !== keys.length) {
    compileErrors.push(new DuplicateKeyCompileError(location));
  }
}

export function mustBeNewable(type: string, compileErrors: CompileError[], location: string) {
  compileErrors.push(new NotNewableCompileError(type, location, false));
}

export function mustBeFunctionRefIfFunction(
  symbol: ElanSymbol,
  compileErrors: CompileError[],
  location: string,
) {
  if (symbol.symbolType() instanceof FunctionType) {
    compileErrors.push(new FunctionRefCompileError(symbol.symbolId, location));
  }
}

export function mustBeKnownCompilerDirective(
  directive: string,
  compileErrors: CompileError[],
  location: string,
) {
  compileErrors.push(new UnknownCompilerDirectiveCompileError(directive, location));
}
