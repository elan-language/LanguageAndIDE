import { Property } from "./class-members/property";
import {
  CannotCallAFunction,
  CannotUseLikeAFunction,
  CannotUseSystemMethodInAFunction,
  CompileError,
  DuplicateKeyCompileError,
  ExtensionCompileError,
  IndexCompileError,
  MustBeAbstractCompileError,
  MustBeConcreteCompileError,
  MustBeImmutableCompileError,
  MustImplementCompileError,
  MutateCompileError,
  NotIndexableCompileError,
  NotIterableCompileError,
  NotNewableCompileError,
  NotRangeableCompileError,
  NotUniqueNameCompileError,
  ParametersCompileError,
  PrintFunctionCompileError,
  PrivatePropertyCompileError,
  ReassignCompileError,
  SyntaxCompileError,
  TypeCompileError,
  TypesCompileError,
  UndefinedSymbolCompileError,
} from "./compile-error";
import { isFunction, isInsideFunctionOrConstructor, isMember } from "./helpers";
import { AstNode } from "./interfaces/ast-node";
import { Parent } from "./interfaces/parent";
import { Scope } from "./interfaces/scope";
import { ElanSymbol } from "./interfaces/symbol";
import { SymbolType } from "./interfaces/symbol-type";
import { allKeywords, reservedWords, thisKeyword } from "./keywords";
import { LetStatement } from "./statements/let-statement";
import { AbstractDictionaryType } from "./symbols/abstract-dictionary-type";
import { ArrayListType } from "./symbols/array-list-type";
import { BooleanType } from "./symbols/boolean-type";
import { ClassType } from "./symbols/class-type";
import { DictionaryType } from "./symbols/dictionary-type";
import { DuplicateSymbol } from "./symbols/duplicate-symbol";
import { EnumType } from "./symbols/enum-type";
import { FloatType } from "./symbols/float-type";
import { FunctionType } from "./symbols/function-type";
import { GenericParameterType } from "./symbols/generic-parameter-type";
import { ImmutableDictionaryType } from "./symbols/immutable-dictionary-type";
import { ImmutableListType } from "./symbols/immutable-list-type";
import { IntType } from "./symbols/int-type";
import { IterType } from "./symbols/iter-type";
import { ProcedureType } from "./symbols/procedure-type";
import { StringType } from "./symbols/string-type";
import { isDictionarySymbolType, isGenericSymbolType } from "./symbols/symbol-helpers";
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

export function mustBeImmutableType(
  symbolType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (!symbolType.isImmutable) {
    compileErrors.push(
      new MustBeImmutableCompileError(
        symbolType.toString(),
        location,
        symbolType instanceof UnknownType,
      ),
    );
  }
}

export function mustNotBeKeyword(id: string, compileErrors: CompileError[], location: string) {
  if (id === thisKeyword) {
    return;
  }

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

export function mustNotBeFunction(
  symbolType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (symbolType instanceof ProcedureType || symbolType instanceof FunctionType) {
    compileErrors.push(new PrintFunctionCompileError(location));
    return;
  }

  if (symbolType instanceof StringType) {
    // todo - string are recusrsively of type string needs to be fixed.
    return;
  }

  if (isGenericSymbolType(symbolType)) {
    mustNotBeFunction(symbolType.ofType, compileErrors, location);
  }

  if (isDictionarySymbolType(symbolType)) {
    mustNotBeFunction(symbolType.keyType, compileErrors, location);
    mustNotBeFunction(symbolType.valueType, compileErrors, location);
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
  if (
    !(
      symbolType instanceof ArrayListType ||
      (read && symbolType instanceof StringType) ||
      symbolType instanceof DictionaryType
    )
  ) {
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
  if (
    !((read && symbolType instanceof ArrayListType) || (read && symbolType instanceof StringType))
  ) {
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

export function mustBePublicProperty(
  property: ElanSymbol,
  compileErrors: CompileError[],
  location: string,
) {
  if (property instanceof Property && property.private === true) {
    compileErrors.push(new PrivatePropertyCompileError(property.name.text, location));
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

    for (const superSymbol of superSymbols) {
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
  if (parms.length < expected) {
    compileErrors.push(new ParametersCompileError(expected, parms.length, location, true));
  }
}

function FailIncompatible(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  const unknown = lhs === UnknownType.Instance || rhs === UnknownType.Instance;
  compileErrors.push(new TypesCompileError(rhs.toString(), lhs.toString(), location, unknown));
}

function FailNotNumber(lhs: SymbolType, compileErrors: CompileError[], location: string) {
  const unknown = lhs === UnknownType.Instance;
  compileErrors.push(new TypesCompileError(lhs.toString(), "Float or Int", location, unknown));
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

  if (lhs instanceof ImmutableListType && rhs instanceof ImmutableListType) {
    mustBeCompatibleType(lhs.ofType, rhs.ofType, compileErrors, location);
  }

  if (lhs instanceof ImmutableListType && !(rhs instanceof ImmutableListType)) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (lhs instanceof ArrayListType && rhs instanceof ArrayListType) {
    mustBeCompatibleType(lhs.ofType, rhs.ofType, compileErrors, location);
  }

  if (lhs instanceof ArrayListType && !(rhs instanceof ArrayListType)) {
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

  if (lhs instanceof AbstractDictionaryType && rhs instanceof AbstractDictionaryType) {
    mustBeCompatibleType(lhs.keyType, rhs.keyType, compileErrors, location);
    mustBeCompatibleType(lhs.valueType, rhs.valueType, compileErrors, location);
    return;
  }

  if (lhs instanceof AbstractDictionaryType && !(rhs instanceof AbstractDictionaryType)) {
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

  if (
    lhs instanceof IterType &&
    !(
      rhs instanceof ImmutableListType ||
      rhs instanceof ArrayListType ||
      rhs instanceof StringType ||
      rhs instanceof IterType
    )
  ) {
    FailIncompatible(lhs, rhs, compileErrors, location);
    return;
  }

  if (
    lhs instanceof IterType &&
    (rhs instanceof ImmutableListType || rhs instanceof ArrayListType || rhs instanceof IterType)
  ) {
    mustBeCompatibleType(lhs.ofType, rhs.ofType, compileErrors, location);
  }

  if (lhs instanceof IterType && rhs instanceof StringType) {
    if (!(lhs.ofType instanceof StringType)) {
      FailIncompatible(lhs, rhs, compileErrors, location);
      return;
    }
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
    mustBeCompatibleTypes(lhs.parametersTypes, rhs.parametersTypes, compileErrors, location);
    mustBeCompatibleType(lhs.returnType, rhs.returnType, compileErrors, location);
    return;
  }

  if (lhs instanceof GenericParameterType && rhs instanceof GenericParameterType) {
    if (lhs.name !== rhs.name) {
      FailIncompatible(lhs, rhs, compileErrors, location);
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

export function mustNotIndexOnFunctionMethod(
  assignable: AstNode,
  parent: Parent,
  compileErrors: CompileError[],
  location: string,
) {
  if (isFunction(parent)) {
    if (isIndexed(assignable)) {
      compileErrors.push(new IndexCompileError(`${getId(assignable)}`, location));
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
      compileErrors.push(new ReassignCompileError(`parameter: ${getId(assignable)}`, location));
    } else {
      // only mutate indexed arraylist
      if (!isIndexed(assignable)) {
        compileErrors.push(new ReassignCompileError(`parameter: ${getId(assignable)}`, location));
      }
    }
  }
}

export function mustNotBeCounter(
  assignable: AstNode,
  compileErrors: CompileError[],
  location: string,
) {
  const s = assignable.symbolScope;

  if (s === SymbolScope.counter) {
    compileErrors.push(new MutateCompileError(`counter`, location));
  }
}

export function mustNotBeConstant(
  assignable: AstNode,
  compileErrors: CompileError[],
  location: string,
) {
  const s = assignable.symbolScope;

  if (s === SymbolScope.program) {
    compileErrors.push(new MutateCompileError(`constant`, location));
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
    compileErrors.push(new MutateCompileError(symbol.symbolId, location));
  }
}

export function mustNotBeReassigned(
  variable: ElanSymbol,
  compileErrors: CompileError[],
  location: string,
) {
  if (!(variable instanceof UnknownSymbol) && variable.symbolScope === SymbolScope.local) {
    compileErrors.push(new ReassignCompileError(variable.symbolId, location));
  }
}

export function mustBeIterable(
  symbolType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (
    !(
      symbolType instanceof ImmutableListType ||
      symbolType instanceof ArrayListType ||
      symbolType instanceof StringType ||
      symbolType instanceof IterType
    )
  ) {
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
