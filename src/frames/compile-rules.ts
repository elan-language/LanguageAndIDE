import { Property } from "./class-members/property";
import {
  CannotCallAFunction,
  CannotUseLikeAFunction,
  CannotUseSystemMethodInAFunction,
  CompileError,
  DuplicateIdsCompileError,
  DuplicateKeyCompileError,
  ExtensionCompileError,
  FunctionRefCompileError,
  MustBeAbstractCompileError,
  MustBeConcreteCompileError,
  MustBeRecordCompileError,
  MustImplementCompileError,
  MutateCompileError,
  NotIndexableCompileError,
  NotIterableCompileError,
  NotNewableCompileError,
  NotRangeableCompileError,
  NotUniqueNameCompileError,
  OutParameterCompileError,
  ParametersCompileError,
  PrivateMemberCompileError,
  ReassignCompileError,
  RedefinedCompileError,
  SignatureCompileError,
  SyntaxCompileError,
  TypeCompileError,
  TypesCompileError,
  UndefinedSymbolCompileError,
} from "./compile-error";
import {
  isClass,
  isConstant,
  isFunction,
  isProcedure,
  isInsideFunctionOrConstructor,
  isMember,
  isLet,
} from "./helpers";
import { AstIdNode } from "./interfaces/ast-id-node";
import { AstNode } from "./interfaces/ast-node";
import { ElanSymbol } from "./interfaces/elan-symbol";
import { Parent } from "./interfaces/parent";
import { Scope } from "./interfaces/scope";
import { SymbolType } from "./interfaces/symbol-type";
import { allKeywords, reservedWords } from "./keywords";
import { LetStatement } from "./statements/let-statement";
import { AbstractDictionaryType } from "./symbols/abstract-dictionary-type";
import { ArrayType } from "./symbols/array-list-type";
import { BooleanType } from "./symbols/boolean-type";
import { ClassType } from "./symbols/class-type";
import { DeconstructedListType } from "./symbols/deconstructed-list-type";
import { DictionaryType } from "./symbols/dictionary-type";
import { DuplicateSymbol } from "./symbols/duplicate-symbol";
import { EnumType } from "./symbols/enum-type";
import { FloatType } from "./symbols/float-type";
import { FunctionType } from "./symbols/function-type";
import { GenericParameterType } from "./symbols/generic-parameter-type";
import { ImmutableDictionaryType } from "./symbols/immutable-dictionary-type";
import { IntType } from "./symbols/int-type";
import { IterableType } from "./symbols/iterable-type";
import { ListType } from "./symbols/list-type";
import { ProcedureType } from "./symbols/procedure-type";
import { RegexType } from "./symbols/regex-type";
import { StringType } from "./symbols/string-type";
import {
  isAnyDictionaryType,
  isDeconstructedType,
  isGenericSymbolType,
  isIndexableType,
  isIterableType,
  isListType,
} from "./symbols/symbol-helpers";
import { SymbolScope } from "./symbols/symbol-scope";
import { TupleType } from "./symbols/tuple-type";
import { UnknownSymbol } from "./symbols/unknown-symbol";
import { UnknownType } from "./symbols/unknown-type";
import { InFunctionScope, isAstIdNode, isAstIndexableNode } from "./syntax-nodes/ast-helpers";
import { Transforms } from "./syntax-nodes/transforms";

export function mustBeOfSymbolType(
  exprType: SymbolType | undefined,
  ofType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  const unknown = exprType?.name === undefined || ofType.name === undefined;
  if (exprType?.name !== ofType.name) {
    compileErrors.push(new TypeCompileError(ofType.toString(), location, unknown));
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
  compileErrors: CompileError[],
  location: string,
) {
  if (symbol instanceof UnknownSymbol) {
    compileErrors.push(new UndefinedSymbolCompileError(symbol.symbolId, location));
  }
}

export function mustBeKnownSymbolType(
  symbolType: SymbolType,
  originalName: string,
  compileErrors: CompileError[],
  location: string,
) {
  if (symbolType instanceof UnknownType) {
    compileErrors.push(new UndefinedSymbolCompileError(originalName, location));
  }
}

export function mustBeRecord(
  symbolType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (!symbolType.isImmutable) {
    compileErrors.push(
      new MustBeRecordCompileError(
        symbolType.toString(),
        location,
        symbolType instanceof UnknownType,
      ),
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
    compileErrors.push(
      new CannotCallAFunction(symbolType.toString(), location, symbolType instanceof UnknownType),
    );
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
  symbolType: SymbolType,
  scope: Scope,
  compileErrors: CompileError[],
  location: string,
) {
  if (InFunctionScope(scope)) {
    if (!(symbolType instanceof FunctionType) || !symbolType.isPure) {
      const imPure = symbolType instanceof FunctionType && !symbolType.isPure;
      compileErrors.push(
        new CannotUseSystemMethodInAFunction(
          symbolType.toString(),
          location,
          symbolType instanceof UnknownType,
        ),
      );
    }
  } else if (!(symbolType instanceof FunctionType)) {
    compileErrors.push(
      new CannotUseLikeAFunction(
        symbolType.toString(),
        location,
        symbolType instanceof UnknownType,
      ),
    );
  }
}

export function mustBeIndexableSymbol(
  symbolType: SymbolType,
  read: boolean,
  compileErrors: CompileError[],
  location: string,
) {
  if (!(read && (isIndexableType(symbolType) || isAnyDictionaryType(symbolType)))) {
    compileErrors.push(
      new NotIndexableCompileError(
        symbolType.toString(),
        location,
        symbolType instanceof UnknownType,
      ),
    );
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
      new NotRangeableCompileError(
        symbolType.toString(),
        location,
        symbolType instanceof UnknownType,
      ),
    );
  }
}

export function mustBeAbstractClass(
  type: ClassType | UnknownType,
  compileErrors: CompileError[],
  location: string,
) {
  if (type instanceof ClassType && !type.isAbstract) {
    compileErrors.push(new MustBeAbstractCompileError(type.toString(), location));
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
  if (symbol.symbolScope !== SymbolScope.property) {
    compileErrors.push(new UndefinedSymbolCompileError(symbol.symbolId, location));
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

      if (subSymbol instanceof UnknownSymbol) {
        compileErrors.push(
          new MustImplementCompileError(
            classType.toString(),
            superClassType.toString(),
            superSymbol.symbolId,
            location,
          ),
        );
      } else {
        mustBeOfSymbolType(
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
  if (classType.isAbstract) {
    compileErrors.push(new MustBeConcreteCompileError(classType.toString(), location));
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
  isExtension: boolean,
  compileErrors: CompileError[],
  location: string,
) {
  const maxLen = parms.length > ofType.length ? parms.length : ofType.length;

  for (let i = 0; i < maxLen; i++) {
    const p = parms[i];
    const t = ofType[i];

    if (p === undefined || t === undefined) {
      const expected = isExtension ? ofType.length - 1 : ofType.length;
      const actual = isExtension ? parms.length - 1 : parms.length;
      compileErrors.push(new ParametersCompileError(expected, actual, location));
    } else {
      mustBeCompatibleType(t, p.symbolType(), compileErrors, location);
    }
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
  compileErrors.push(
    new TypesCompileError(rhs.toString(), lhs.toString(), addInfo, location, unknown),
  );
}

function FailNotNumber(lhs: SymbolType, compileErrors: CompileError[], location: string) {
  const unknown = lhs === UnknownType.Instance;
  compileErrors.push(new TypesCompileError(lhs.toString(), "Float or Int", "", location, unknown));
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
  if (
    (lhs instanceof IntType || lhs instanceof FloatType) &&
    (rhs instanceof IntType || rhs instanceof FloatType)
  ) {
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
  if (!(lhs instanceof IntType || lhs instanceof FloatType)) {
    FailNotNumber(lhs, compileErrors, location);
  }
  if (!(rhs instanceof IntType || rhs instanceof FloatType)) {
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

export function mustBeInvariantType(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (lhs instanceof FloatType && !(rhs instanceof IntType || rhs instanceof FloatType)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (lhs.name !== rhs.name) {
    FailIncompatible(lhs, rhs, compileErrors, location);
  }
}

export function mustBeCompatibleType(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (lhs instanceof RegexType && !(rhs instanceof RegexType)) {
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
  if (lhs instanceof FloatType && !(rhs instanceof IntType || rhs instanceof FloatType)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (lhs instanceof ListType && rhs instanceof ListType) {
    mustBeCompatibleType(lhs.ofType, rhs.ofType, compileErrors, location);
  }

  if (lhs instanceof ListType && !(rhs instanceof ListType)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (lhs instanceof ArrayType && rhs instanceof ArrayType) {
    mustBeCompatibleType(lhs.ofType, rhs.ofType, compileErrors, location);
  }

  if (lhs instanceof ArrayType && !(rhs instanceof ArrayType)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (lhs instanceof DictionaryType && rhs instanceof DictionaryType) {
    mustBeCompatibleType(lhs.keyType, rhs.keyType, compileErrors, location);
    mustBeCompatibleType(lhs.valueType, rhs.valueType, compileErrors, location);
    return;
  }

  if (lhs instanceof DictionaryType && !(rhs instanceof DictionaryType)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (lhs instanceof ImmutableDictionaryType && rhs instanceof ImmutableDictionaryType) {
    mustBeCompatibleType(lhs.keyType, rhs.keyType, compileErrors, location);
    mustBeCompatibleType(lhs.valueType, rhs.valueType, compileErrors, location);
    return;
  }

  if (lhs instanceof ImmutableDictionaryType && !(rhs instanceof ImmutableDictionaryType)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (lhs instanceof AbstractDictionaryType && isAnyDictionaryType(rhs)) {
    mustBeCompatibleType(lhs.keyType, rhs.keyType, compileErrors, location);
    mustBeCompatibleType(lhs.valueType, rhs.valueType, compileErrors, location);
    return;
  }

  if (lhs instanceof AbstractDictionaryType && !isAnyDictionaryType(rhs)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (lhs instanceof TupleType && rhs instanceof TupleType) {
    if (lhs.ofTypes.length === rhs.ofTypes.length) {
      mustBeCompatibleTypes(lhs.ofTypes, rhs.ofTypes, compileErrors, location);
    } else {
      FailIncompatible(lhs, rhs, compileErrors, location);
    }
  }

  if (lhs instanceof TupleType && !(rhs instanceof TupleType)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (lhs instanceof IterableType && !isIterableType(rhs)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (lhs instanceof IterableType && isIterableType(rhs)) {
    mustBeCompatibleType(lhs.ofType, rhs.ofType, compileErrors, location);
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
    mustBeCompatibleSignatures(lhs.parametersTypes, rhs.parametersTypes, compileErrors, location);
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

export function mustBeCompatibleNode(
  lhs: AstNode,
  rhs: AstNode,
  compileErrors: CompileError[],
  location: string,
) {
  const lst = lhs.symbolType();
  const rst = rhs.symbolType();

  mustBeCompatibleType(lst, rst, compileErrors, location);
}

function getId(astNode: AstNode) {
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
  if (isFunction(parent) && isMember(parent)) {
    const s = assignable.symbolScope;

    if (s === SymbolScope.property) {
      compileErrors.push(new ReassignCompileError(`property: ${getId(assignable)}`, location));
    }
  }
}

export function mustBePropertyPrefixedOnAssignable(
  assignable: AstNode,
  parent: Parent,
  compileErrors: CompileError[],
  location: string,
) {
  if (isMember(parent)) {
    const s = assignable.symbolScope;

    if (s === SymbolScope.property) {
      if (isAstIndexableNode(assignable) && !assignable.qualifier) {
        compileErrors.push(
          new SyntaxCompileError(`assigning to a property requires a prefix`, location),
        );
      }
    }
  }
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
      compileErrors.push(new RedefinedCompileError(getId(assignable), "parameter", location));
    } else {
      // only mutate indexed Array
      if (!isIndexed(assignable)) {
        compileErrors.push(new RedefinedCompileError(getId(assignable), "parameter", location));
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
    compileErrors.push(new NotUniqueNameCompileError(name, location));
  }
}

export function mustBeUniqueValueInScope(
  name: string,
  compileErrors: CompileError[],
  location: string,
) {
  compileErrors.push(new NotUniqueNameCompileError(name, location));
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
    !(variable instanceof UnknownSymbol) &&
    !(variable.symbolScope === SymbolScope.stdlib || variable.symbolScope === SymbolScope.property)
  ) {
    compileErrors.push(
      new RedefinedCompileError(variable.symbolId, mapToPurpose(variable), location),
    );
  }
}

export function mustBeIterable(
  symbolType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (!isIterableType(symbolType)) {
    compileErrors.push(
      new NotIterableCompileError(
        symbolType.toString(),
        location,
        symbolType instanceof UnknownType,
      ),
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

export function cannotHaveDuplicatePrivateIds(
  duplicates: string[],
  compileErrors: CompileError[],
  location: string,
) {
  compileErrors.push(new DuplicateIdsCompileError(duplicates, location));
}

export function cannotAccessPrivateMemberInAbstractClass(
  id: string,
  compileErrors: CompileError[],
  location: string,
) {
  compileErrors.push(
    new SyntaxCompileError(`Cannot access private member ${id} in abstract class`, location),
  );
}

export function cannotAccessAbstractMemberInAbstractClass(
  id: string,
  compileErrors: CompileError[],
  location: string,
) {
  compileErrors.push(
    new SyntaxCompileError(`Cannot access abstract member ${id} in abstract class`, location),
  );
}

export function mustBeFunctionRefIfFunction(
  symbol: ElanSymbol,
  compileErrors: CompileError[],
  location: string,
) {
  if (isFunction(symbol)) {
    compileErrors.push(new FunctionRefCompileError(symbol.symbolId, location));
  }
}
