import { ArrayListType } from "./symbols/array-list-type";
import { BooleanType } from "./symbols/boolean-type";
import { ClassType } from "./symbols/class-type";
import { DictionaryType } from "./symbols/dictionary-type";
import { FunctionType } from "./symbols/function-type";
import { GenericParameterType } from "./symbols/generic-parameter-type";
import { IntType } from "./symbols/int-type";
import { IterType } from "./symbols/iter-type";
import { ImmutableListType } from "./symbols/immutable-list-type";
import { FloatType } from "./symbols/float-type";
import { ProcedureType } from "./symbols/procedure-type";
import { StringType } from "./symbols/string-type";
import { ElanSymbol } from "./interfaces/symbol";
import { SymbolType } from "./interfaces/symbol-type";
import { TupleType } from "./symbols/tuple-type";
import { UnknownSymbol } from "./symbols/unknown-symbol";
import { UnknownType } from "./symbols/unknown-type";
import {
  ArraySizeCompileError,
  CompileError,
  DuplicateKeyCompileError,
  ExtensionCompileError,
  MustBeAbstractCompileError,
  MustBeConcreteCompileError,
  MustBeImmutableCompileError,
  MustImplementCompileError,
  MutateCompileError,
  NotCallableCompileError,
  NotIndexableCompileError,
  NotIterableCompileError,
  ParametersCompileError,
  PrivatePropertyCompileError,
  ReassignCompileError,
  SyntaxCompileError,
  TypeCompileError,
  TypesCompileError,
  UndefinedSymbolCompileError,
} from "./compile-error";
import { Parent } from "./interfaces/parent";
import { Scope } from "./interfaces/scope";
import { InFunctionScope } from "./syntax-nodes/ast-helpers";
import { AstNode } from "./interfaces/ast-node";
import { Transforms } from "./syntax-nodes/transforms";
import { SymbolScope } from "./symbols/symbol-scope";
import { Property } from "./class-members/property";
import { ProcedureFrame } from "./globals/procedure-frame";
import { AstQualifiedNode } from "./interfaces/ast-qualified-node";
import { LetStatement } from "./statements/let-statement";
import { allKeywords, thisKeyword } from "./keywords";
import { FunctionMethod } from "./class-members/function-method";
import { EnumType } from "./symbols/enum-type";

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

export function mustBeOneOrTwoOfTypeInt(
  params: AstNode[],
  compileErrors: CompileError[],
  location: string,
) {
  if (params.length === 0 || params.length > 2) {
    compileErrors.push(new ArraySizeCompileError(location));
  }
  if (params.length > 0) {
    mustBeOfSymbolType(params[0].symbolType(), IntType.Instance, compileErrors, location);
  }
  if (params.length > 1) {
    mustBeOfSymbolType(params[1].symbolType(), IntType.Instance, compileErrors, location);
  }
}

export function mustHaveLastSingleElse(
  elses: { hasIf: boolean }[],
  compileErrors: CompileError[],
  location: string,
) {
  if (elses.filter((s) => !s.hasIf).length > 1) {
    compileErrors.push(
      new SyntaxCompileError(`Cannot have multiple unconditional 'Else'`, location),
    );
  }

  if (elses[elses.length - 1].hasIf) {
    compileErrors.push(new SyntaxCompileError(`Must end with unconditional 'Else'`, location));
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
      new SyntaxCompileError(`'${id}' keyword may not be used as identifier`, location),
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
      new NotCallableCompileError(
        symbolType.toString(),
        location,
        false,
        symbolType instanceof UnknownType,
      ),
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
        new NotCallableCompileError(
          symbolType.toString(),
          location,
          imPure,
          symbolType instanceof UnknownType,
        ),
      );
    }
  } else {
    if (!(symbolType instanceof FunctionType)) {
      compileErrors.push(
        new NotCallableCompileError(
          symbolType.toString(),
          location,
          false,
          symbolType instanceof UnknownType,
        ),
      );
    }
  }
}

export function mustBeIndexableSymbol(
  symbolType: SymbolType,
  isDouble: boolean,
  compileErrors: CompileError[],
  location: string,
) {
  if (
    !(
      symbolType instanceof ArrayListType ||
      symbolType instanceof StringType ||
      (symbolType instanceof DictionaryType && !symbolType.isImmutable)
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
  if (
    isDouble &&
    ((symbolType instanceof ArrayListType && !symbolType.is2d) ||
      symbolType instanceof ImmutableListType ||
      symbolType instanceof StringType ||
      symbolType instanceof DictionaryType)
  ) {
    compileErrors.push(new NotIndexableCompileError(symbolType.toString(), location, false));
  }
  if (!isDouble && symbolType instanceof ArrayListType && symbolType.is2d) {
    compileErrors.push(new NotIndexableCompileError(symbolType.toString(), location, false));
  }
}

export function mustBeAbstractClass(
  classType: ClassType,
  compileErrors: CompileError[],
  location: string,
) {
  if (!classType.isAbstract) {
    compileErrors.push(new MustBeAbstractCompileError(classType.toString(), location));
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
  ft: FunctionType,
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
  compileErrors: CompileError[],
  location: string,
) {
  const maxLen = parms.length > ofType.length ? parms.length : ofType.length;

  for (let i = 0; i < maxLen; i++) {
    const p = parms[i];
    const t = ofType[i];

    if (p === undefined || t === undefined) {
      compileErrors.push(new ParametersCompileError(ofType.length, parms.length, location));
    } else {
      mustBeCompatibleType(t, p.symbolType(), compileErrors, location);
    }
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

  mustBeCompatibleType(lhs, rhs, compileErrors, location);
}

export function mustBeNumberType(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  mustBeCompatibleType(FloatType.Instance, lhs, compileErrors, location);
  mustBeCompatibleType(FloatType.Instance, rhs, compileErrors, location);
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
  const maxLen = lhss.length > rhss.length ? lhss.length : rhss.length;
  for (let i = 0; i < maxLen; i++) {
    mustBeCompatibleType(lhss[i], rhss[i], compileErrors, location);
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

  if (lhs instanceof TupleType && rhs instanceof TupleType) {
    mustBeCompatibleTypes(lhs.ofTypes, rhs.ofTypes, compileErrors, location);
    return;
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
    if (!(lhs.ofType instanceof GenericParameterType || lhs.ofType instanceof StringType)) {
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
}

export function mustBeCompatibleNode(
  lhs: AstNode,
  rhs: AstNode,
  compileErrors: CompileError[],
  location: string,
) {
  const lst = lhs.symbolType();
  const rst = rhs.symbolType();

  if (
    lst instanceof UnknownType ||
    lst === undefined ||
    rst instanceof UnknownType ||
    rst === undefined
  ) {
    return; //Because there will be a higher priority compile error
  }

  mustBeCompatibleType(lst, rst, compileErrors, location);
}

export function mustNotBePropertyOnFunctionMethod(
  assignable: AstNode,
  parent: Parent,
  compileErrors: CompileError[],
  location: string,
) {
  if (parent instanceof FunctionMethod) {
    const s = assignable.symbolScope;

    if (s !== SymbolScope.local) {
      compileErrors.push(new MutateCompileError(`non local data in function`, location));
    }
  }
}

export function mustNotBeParameter(
  assignable: AstQualifiedNode,
  parent: Parent,
  compileErrors: CompileError[],
  location: string,
) {
  const s = assignable.symbolScope;

  if (s === SymbolScope.parameter) {
    if (parent instanceof ProcedureFrame) {
      // only mutate indexed arraylist
      const rst = assignable.rootSymbolType();
      const st = assignable.symbolType();
      if (rst.name === st.name) {
        // ie not indexed
        compileErrors.push(new MutateCompileError(`parameter`, location));
      }
    } else {
      compileErrors.push(new MutateCompileError(`parameter`, location));
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
