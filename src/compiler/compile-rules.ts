import { AstNode } from "../compiler/compiler-interfaces/ast-node";
import { ElanSymbol } from "../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../compiler/compiler-interfaces/scope";
import { SymbolType } from "../compiler/compiler-interfaces/symbol-type";
import { ElanCompilerError } from "./elan-compiler-error";
import { allKeywords, propertyKeyword, reservedWords } from "./keywords";

import {
    CannotCallAFunction,
    CannotCallAsAMethod,
    CannotUseLikeAFunction,
    CannotUseSystemMethodInAFunction,
    CompileError,
    DeclaredAboveCompileError,
    DivCompileError,
    DuplicateKeyCompileError,
    ExtensionCompileError,
    ExtraParameterCompileError,
    FunctionRefCompileError,
    GenericParametersCompileError,
    InvalidSourceForEachCompileError,
    IsDeprecated,
    MemberTypeCompileError,
    MissingParameterCompileError,
    MustBeAbstractCompileError,
    MustBeConcreteCompileError,
    MustBeInterfaceCompileError,
    MustBeSingleAbstractCompileError,
    MustImplementCompileError,
    MustNotBeCircularDependencyCompileError,
    MutateCompileError,
    NotGlobalFunctionRefCompileError,
    NotIndexableCompileError,
    NotNewableCompileError,
    NotRangeableCompileError,
    NotUniqueNameCompileError,
    OutParameterCompileError,
    ParameterNameCompileError,
    ParameterTypesCompileError,
    PrivateMemberCompileError,
    PropertyCompileError,
    ReassignInFunctionCompileError,
    RedefinedCompileError,
    SyntaxCompileError,
    TernaryCompileError,
    ThisCompileError,
    TypeCompileError,
    TypesCompileError,
    UndefinedSymbolCompileError,
} from "./compile-error";
import { Deprecation } from "./compiler-interfaces/elan-type-interfaces";
import { BooleanType } from "./symbols/boolean-type";
import { ClassSubType, ClassType } from "./symbols/class-type";
import { DuplicateSymbol } from "./symbols/duplicate-symbol";
import { FloatType } from "./symbols/float-type";
import { FunctionType } from "./symbols/function-type";
import { IntType } from "./symbols/int-type";
import { ProcedureType } from "./symbols/procedure-type";
import {
    getGlobalScope,
    isClass,
    isDoubleIndexableType,
    isFunction,
    isGlobalConstant,
    isIndexableType,
    isIterableType,
    isKnownType,
    isLocalConstant,
    isMember,
    isNumber,
    isProcedure,
    isSymbol,
    isValueType,
    isValueTypeExcludingString,
    symbolScopeToFriendlyName,
} from "./symbols/symbol-helpers";
import { SymbolScope } from "./symbols/symbol-scope";
import { TestType } from "./symbols/test-type";
import { UnknownSymbol } from "./symbols/unknown-symbol";
import { UnknownType } from "./symbols/unknown-type";
import {
    getInnerMostFunction,
    inFunctionScope,
    isAstIdNode,
    isAstIndexableNode,
    isAstQualifiedNode,
    isAstQualifierNode,
    isEmptyNode,
    isInsideFunction,
    isInsideFunctionOrConstructor,
} from "./syntax-nodes/ast-helpers";
import { PropertyAsn } from "./syntax-nodes/class-members/property-asn";
import { FixedIdAsn } from "./syntax-nodes/fixed-id-asn";
import { FuncCallAsn } from "./syntax-nodes/func-call-asn";
import { ElseAsn } from "./syntax-nodes/statements/else-asn";
import { LocalConstantAsn } from "./syntax-nodes/statements/local-constant-asn";
import { ThisAsn } from "./syntax-nodes/this-asn";

export function mustBeOfSymbolType(
  exprType: SymbolType,
  ofType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (isKnownType(exprType) && exprType.name !== ofType.name) {
    compileErrors.push(new TypeCompileError(ofType.name, location));
  }
}

export function mustBeMemberOfSymbolType(
  name: string,
  exprType: SymbolType,
  ofType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (isKnownType(exprType) && exprType.name !== ofType.name) {
    compileErrors.push(new MemberTypeCompileError(name, ofType.name, location));
  }
}

export function mustBeOfType(
  expr: AstNode,
  ofType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  mustBeOfSymbolType(expr.symbolType(), ofType, compileErrors, location);
}

export function mustBeBooleanCondition(
  expr: AstNode,
  compileErrors: CompileError[],
  location: string,
) {
  const st = expr.symbolType();

  if (isKnownType(st) && st !== BooleanType.Instance) {
    compileErrors.push(
      new SyntaxCompileError(
        "Condition of 'if' expression does not evaluate to a Boolean.",
        location,
      ),
    );
  }
}

export function mustNotHaveConditionalAfterUnconditionalElse(
  elses: ElseAsn[],
  compileErrors: CompileError[],
  location: string,
) {
  const unconditionals = elses.filter((s) => !s.hasIf).length;
  if (unconditionals > 1 || (unconditionals === 1 && elses[elses.length - 1].hasIf)) {
    compileErrors.push(
      new SyntaxCompileError(`Cannot have any clause after unconditional 'else'.`, location),
    );
  }
}

export function mustBeKnownSymbol(
  symbol: ElanSymbol,
  scope: Scope,
  onSymbol: string,
  onType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (symbol instanceof UnknownSymbol && onType instanceof UnknownType) {
    const type = isClass(scope) ? scope.symbolId : "";
    const id = onSymbol || symbol.symbolId;
    compileErrors.push(new UndefinedSymbolCompileError(id, type, location));
  } else if (symbol instanceof UnknownSymbol) {
    const type = isClass(scope) ? scope.symbolId : onType.name;
    compileErrors.push(new UndefinedSymbolCompileError(symbol.symbolId, type, location));
  }
}

export function mustBeKnownExtension(
  id: string,
  type: string,
  compileErrors: CompileError[],
  location: string,
) {
  compileErrors.push(new UndefinedSymbolCompileError(id, type, location));
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

export function mustNotBeKeyword(id: string, compileErrors: CompileError[], location: string) {
  if (allKeywords.includes(id)) {
    compileErrors.push(
      new SyntaxCompileError(
        `'${id}' is a reserved word, and may not be used as an identifier. Either extend name or choose another..`,
        location,
      ),
    );
  }
  if (reservedWords.includes(id)) {
    compileErrors.push(
      new SyntaxCompileError(
        `'${id}' is a reserved word, and may not be used as an identifier.`,
        location,
      ),
    );
  }
}

export function mustBeProcedure(
  symbolId: string,
  symbolType: SymbolType,
  symbolScope: SymbolScope,
  compileErrors: CompileError[],
  location: string,
) {
  if (symbolType instanceof FunctionType) {
    compileErrors.push(new CannotCallAFunction(location));
  } else if (isKnownType(symbolType) && !(symbolType instanceof ProcedureType)) {
    compileErrors.push(
      new CannotCallAsAMethod(symbolId, symbolScopeToFriendlyName(symbolScope), location),
    );
  }
}

export function mustBeCallable(
  symbolId: string,
  symbolType: SymbolType,
  symbolScope: SymbolScope,
  compileErrors: CompileError[],
  location: string,
) {
  if (symbolType instanceof ProcedureType) {
    compileErrors.push(new CannotUseLikeAFunction(symbolId, location));
  } else if (isKnownType(symbolType)) {
    compileErrors.push(
      new CannotCallAsAMethod(symbolId, symbolScopeToFriendlyName(symbolScope), location),
    );
  }
}

export function mustBePureFunctionSymbol(
  symbolType: FunctionType,
  scope: Scope,
  compileErrors: CompileError[],
  location: string,
) {
  if (inFunctionScope(scope)) {
    if (isKnownType(symbolType) && !symbolType.isPure) {
      compileErrors.push(new CannotUseSystemMethodInAFunction(location));
    }
  }
}

export function checkForDeprecation(
  symbolType: FunctionType | ProcedureType | ClassType,
  scope: Scope,
  compileErrors: CompileError[],
  location: string,
) {
  if (symbolType.deprecated) {
    const reason = symbolType.deprecated.reason;

    if (reason === Deprecation.methodHidden) {
      // no compile error when hidden
      return;
    }

    if (
      (reason === Deprecation.classParametersChanged ||
        reason === Deprecation.methodParametersChanged) &&
      compileErrors.length === 0
    ) {
      // ignore if the parameters compiled
      return;
    }

    const file = getGlobalScope(scope);
    const version = file.getVersion();
    const fromMajor = symbolType.deprecated.fromMajor;
    const fromMinor = symbolType.deprecated.fromMinor;

    if (fromMajor < version.major || (fromMajor === version.major && fromMinor <= version.minor)) {
      compileErrors.push(
        new IsDeprecated(
          reason,
          fromMajor,
          fromMinor,
          symbolType.deprecated.message,
          location,
          symbolType.deprecated.Severity,
        ),
      );
    }
  }
}

export function mustNotBeNegativeIndex(compileErrors: CompileError[], location: string) {
  compileErrors.push(new SyntaxCompileError("Index cannot be negative.", location));
}

export function mustBeIndexableType(
  symbolId: string,
  symbolType: SymbolType,
  read: boolean,
  compileErrors: CompileError[],
  location: string,
) {
  if (symbolType instanceof UnknownType) {
    compileErrors.push(new UndefinedSymbolCompileError(symbolId, "", location));
  } else if (!(read && isIndexableType(symbolType))) {
    compileErrors.push(new NotIndexableCompileError(symbolType.name, location, false));
  }
}

export function mustBeDoubleIndexableType(
  symbolId: string,
  symbolType: SymbolType,
  read: boolean,
  compileErrors: CompileError[],
  location: string,
) {
  if (symbolType instanceof UnknownType) {
    compileErrors.push(new UndefinedSymbolCompileError(symbolId, "", location));
  } else if (!(read && isDoubleIndexableType(symbolType))) {
    compileErrors.push(new NotIndexableCompileError(symbolType.name, location, true));
  }
}

export function mustBeRangeableType(
  symbolType: SymbolType,
  read: boolean,
  compileErrors: CompileError[],
  location: string,
) {
  if (isKnownType(symbolType) && !(read && isIterableType(symbolType))) {
    compileErrors.push(new NotRangeableCompileError(symbolType.name, location));
  }
}

export function mustBeInheritableClassOrInterface(
  symbolType: SymbolType,
  name: string,
  compileErrors: CompileError[],
  location: string,
) {
  if (
    isKnownType(symbolType) &&
    (!(symbolType instanceof ClassType) ||
      symbolType.subType === ClassSubType.concrete ||
      symbolType.isNotInheritable)
  ) {
    compileErrors.push(new MustBeAbstractCompileError(name, location));
  }
}

export function mustBeInterfaceClass(
  symbolType: SymbolType,
  name: string,
  compileErrors: CompileError[],
  location: string,
) {
  if (
    isKnownType(symbolType) &&
    (!(symbolType instanceof ClassType) ||
      symbolType.subType !== ClassSubType.interface ||
      symbolType.isNotInheritable)
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
  if (symbol instanceof PropertyAsn && symbol.private === true) {
    compileErrors.push(new PrivateMemberCompileError(getId(symbol.name), location));
  }
  if (symbol.symbolScope !== SymbolScope.member) {
    compileErrors.push(new UndefinedSymbolCompileError(symbol.symbolId, "", location));
  }
}

export function mustImplementSuperClasses(
  classType: ClassType,
  superClassTypes: ClassType[],
  compileErrors: CompileError[],
  location: string,
) {
  for (const superClassType of superClassTypes) {
    const superSymbols = superClassType.childSymbols();

    for (const superSymbol of superSymbols.filter((ss) => isMember(ss) && ss.isAbstract)) {
      const subSymbol = classType.resolveSymbol(superSymbol.symbolId, classType);

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
          subSymbol.symbolType(),
          superSymbol.symbolType(),
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
    if (isKnownType(st)) {
      compileErrors.push(new TypeCompileError("Class", location));
    }
  }
}

export function mustBeInsideClass(compileErrors: CompileError[], location: string) {
  compileErrors.push(new ThisCompileError(location));
}

export function mustBeDeclaredAbove(name: string, compileErrors: CompileError[], location: string) {
  compileErrors.push(new DeclaredAboveCompileError(name, location));
}

export function mustCallExtensionViaQualifier(
  ft: FunctionType | ProcedureType,
  qualifier: AstNode,
  compileErrors: CompileError[],
  location: string,
) {
  if (ft.isExtension && isEmptyNode(qualifier)) {
    compileErrors.push(new ExtensionCompileError(location));
  }
}

function qualifierIsFixedIdOrEmpty(qualifier: AstNode) {
  if (isEmptyNode(qualifier)) {
    return true;
  }

  return isAstQualifierNode(qualifier)
    ? qualifier.value instanceof FixedIdAsn
    : qualifier instanceof FixedIdAsn;
}

export function mustNotCallNonExtensionViaQualifier(
  ft: FunctionType | ProcedureType,
  name: string,
  qualifier: AstNode,
  scope: Scope,
  compileErrors: CompileError[],
  location: string,
) {
  // method is not extension with a qualifier that is not a fixed id
  if (ft.isExtension || isClass(scope) || qualifierIsFixedIdOrEmpty(qualifier)) {
    return;
  }

  compileErrors.push(new UndefinedSymbolCompileError(name, qualifier.symbolType().name, location));
}

export function mustbeValidQualifier(
  qualifier: AstNode,
  compileErrors: CompileError[],
  location: string,
) {
  if (qualifier instanceof ThisAsn) {
    compileErrors.push(new PropertyCompileError(location));
  }
}

export function mustCallMemberViaQualifier(
  id: string,
  ft: FunctionType | ProcedureType,
  scope: Scope,
  compileErrors: CompileError[],
  location: string,
) {
  if (!ft.isExtension && isClass(scope)) {
    const t = scope.resolveOwnSymbol(id);
    if (t instanceof UnknownSymbol) {
      compileErrors.push(new UndefinedSymbolCompileError(id, scope.symbolId, location));
    }
  }
}

export function mustMatchParameters(
  id: string,
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
    const parmType = extensionParm.symbolType();
    if (!extensionOfType.isAssignableFrom(parmType)) {
      mustBeKnownExtension(id, parmType.name, compileErrors, location);
      return;
    }
  }

  const maxLen = parms.length > ofType.length ? parms.length : ofType.length;
  const tempErrors: CompileError[] = [];
  const parmTypes = parms.map((p) => p.symbolType());

  for (let i = 0; i < maxLen; i++) {
    const p = parmTypes[i];
    const t = ofType[i];
    if (p && t) {
      mustBeAssignableType(t, p, tempErrors, location);
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
    compileErrors.push(new GenericParametersCompileError(expected, parms.length, location));
  }
}

function FailNotAssignable(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (isKnownType(lhs) && isKnownType(rhs)) {
    // special case
    compileErrors.push(new TypesCompileError(rhs.name, lhs.name, "", location));
  }
}

function FailNoCommonType(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (isKnownType(lhs) && isKnownType(rhs)) {
    compileErrors.push(new TernaryCompileError(rhs.name, lhs.name, location));
  }
}

function FailNotNumber(lhs: SymbolType, compileErrors: CompileError[], location: string) {
  if (isKnownType(lhs)) {
    compileErrors.push(new TypesCompileError(lhs.name, "Float or Int", "", location));
  }
}

function FailCannotCompareProcFunc(compileErrors: CompileError[], location: string) {
  compileErrors.push(
    new SyntaxCompileError(
      "Cannot do equality operations on Procedures or Functions.",
      location,
      "LangRef.html#CannotCompareProcFunc",
    ),
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

  mustBeAssignableType(lhs, rhs, compileErrors, location);
}

export function mustBeValueType(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  // for compare allow int and floats
  if (!isValueTypeExcludingString(lhs) || !isValueTypeExcludingString(rhs)) {
    compileErrors.push(
      new SyntaxCompileError(
        `Can only compare value types with an operator. To compare reference types use '.isSameValueAs' or '.isSameReferenceAs'`,
        location,
      ),
    );
  }
}

export function mustBeKnownOperation(op: string, compileErrors: CompileError[], location: string) {
  compileErrors.push(
    new SyntaxCompileError(
      `UNEXPECTED COMPILE ERROR:  '${op}'  Please email a screenshot to rpawson@nakedobjects.org - then edit your code until this error disappears.`,
      location,
    ),
  );
}

export function mustBeNumberType(st: SymbolType, compileErrors: CompileError[], location: string) {
  if (!isNumber(st)) {
    FailNotNumber(st, compileErrors, location);
  }
}

export function mustBeNumberTypes(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  mustBeNumberType(lhs, compileErrors, location);

  mustBeNumberType(rhs, compileErrors, location);
}

export function mustBeBooleanType(st: SymbolType, compileErrors: CompileError[], location: string) {
  mustBeAssignableType(BooleanType.Instance, st, compileErrors, location);
}

export function mustBeBooleanTypes(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  mustBeBooleanType(lhs, compileErrors, location);
  mustBeBooleanType(rhs, compileErrors, location);
}

export function mustBeIntegerType(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  mustBeAssignableType(IntType.Instance, lhs, compileErrors, location);
  mustBeAssignableType(IntType.Instance, rhs, compileErrors, location);
}

export function mustNotBeIntegerTypesToDivide(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (lhs === IntType.Instance && rhs === IntType.Instance) {
    compileErrors.push(
      new SyntaxCompileError(
        "Cannot apply / to two integer values. Either ensure at least one value is floating point type, or use the function divAsInt or divAsFloat.",
        location,
      ),
    );
  }
}

export function mustBeImmutableType(
  name: string,
  type: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (!type.typeOptions.isImmutable) {
    compileErrors.push(
      new SyntaxCompileError(`Property ${name} is not of an immutable type.`, location),
    );
  }
}

export function mustBeImmutableGenericType(
  type: SymbolType,
  ofType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (!ofType.typeOptions.isImmutable) {
    compileErrors.push(
      new SyntaxCompileError(`${type} cannot be of mutable type '${ofType.name}'.`, location),
    );
  }
}

export function mustBeValidKeyType(
  type: SymbolType,
  ofType: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (
    !ofType.typeOptions.isImmutable ||
    (ofType instanceof ClassType &&
      (ofType.typeOptions.isIndexable || ofType.typeOptions.isIterable))
  ) {
    compileErrors.push(
      new SyntaxCompileError(`${type} cannot have key of type '${ofType.name}'.`, location),
    );
  }
}

export function mustBeCompatibleType(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (
    lhs.name === rhs.name ||
    ((lhs instanceof IntType || lhs instanceof FloatType) &&
      (rhs instanceof FloatType || rhs instanceof IntType))
  ) {
    return;
  }

  if (
    lhs instanceof ClassType &&
    rhs instanceof ClassType &&
    (lhs.isAssignableFrom(rhs) || rhs.isAssignableFrom(lhs))
  ) {
    return;
  }

  FailNoCommonType(lhs, rhs, compileErrors, location);
}

export function mustBeAssignableType(
  lhs: SymbolType,
  rhs: SymbolType,
  compileErrors: CompileError[],
  location: string,
) {
  if (!lhs.isAssignableFrom(rhs)) {
    FailNotAssignable(lhs, rhs, compileErrors, location);
  }
}

export function mustBeCompatibleDefinitionNode(
  rhs: AstNode,
  isConstant: boolean,
  compileErrors: CompileError[],
  location: string,
) {
  const rst = rhs.symbolType();

  if (rst instanceof TestType) {
    compileErrors.push(new SyntaxCompileError(`Cannot assign a test to a variable.`, location));
  }

  if (isConstant && !isValueType(rst)) {
    compileErrors.push(
      new SyntaxCompileError(`Can only assign a value type to a constant`, location),
    );
  }
}

export function mustConformToCopyOfThisBoilerPlate(
  lhs: AstNode,
  rhs: AstNode,
  scope: Scope,
  isVariable: boolean,
  compileErrors: CompileError[],
  location: string,
) {
  if (isAstIdNode(lhs) && lhs.id === "copyOfThis") {
    const innerFunction = getInnerMostFunction(scope);
    if (
      isVariable &&
      rhs instanceof FuncCallAsn &&
      rhs.id === "shallowCopy" &&
      rhs.parameters.length === 1 &&
      rhs.parameters[0] instanceof ThisAsn &&
      innerFunction &&
      isMember(innerFunction)
    ) {
      return;
    }
    compileErrors.push(
      new SyntaxCompileError(
        "Can only use 'copyOfThis in statement of form 'variable copyOfThis set to shallowCopy(this).",
        location,
      ),
    );
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

  mustBeAssignableType(lst, rst, compileErrors, location);
}

export function getId(astNode: AstNode) {
  if (isAstIdNode(astNode)) {
    return astNode.id;
  }
  return "unknown";
}

export function getQualifierId(astNode: AstNode) {
  if (isAstQualifierNode(astNode)) {
    return getId(astNode.value);
  }
  return getId(astNode);
}

export function mustNotBePropertyOnFunctionMethod(
  assignable: AstNode,
  scope: Scope,
  compileErrors: CompileError[],
  location: string,
) {
  const s = assignable.symbolScope;
  if (s === SymbolScope.member) {
    if (isInsideFunction(scope)) {
      if (isAstQualifiedNode(assignable)) {
        const id = isAstIdNode(assignable.qualifier) ? assignable.qualifier.id : "";

        if (id === "copyOfThis") {
          // this is allowing a property to be set when the property is on a new class instance within the function
          // and the new class instance is the same class as the function's class
          return;
        }
      }

      compileErrors.push(
        new ReassignInFunctionCompileError(`property: ${getId(assignable)}`, location),
      );
    } else {
      if (isAstQualifiedNode(assignable)) {
        if (
          assignable.qualifier instanceof ThisAsn &&
          assignable.qualifier.originalKeyword === propertyKeyword
        ) {
          return;
        }
      }

      compileErrors.push(
        new SyntaxCompileError(`Cannot set property: ${getId(assignable)} directly.`, location),
      );
    }
  }
}

export function mustNotSetIndexInFunctionMethod(
  scope: Scope,
  compileErrors: CompileError[],
  location: string,
) {
  if (isInsideFunction(scope)) {
    compileErrors.push(
      new SyntaxCompileError(
        `Cannot mutate set an indexed value within a function. Use .withPut... function`,
        location,
      ),
    );
  }
}

export function mustNotSetRangedIndex(compileErrors: CompileError[], location: string) {
  compileErrors.push(new SyntaxCompileError(`Cannot mutate set a ranged value`, location));
}

export function mustBePropertyPrefixedOnMember(compileErrors: CompileError[], location: string) {
  compileErrors.push(new SyntaxCompileError(`referencing a property requires a prefix.`, location));
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
  parent: Scope,
  compileErrors: CompileError[],
  location: string,
) {
  const s = assignable.symbolScope;

  if (s === SymbolScope.parameter) {
    if (isInsideFunctionOrConstructor(parent)) {
      compileErrors.push(new MutateCompileError(getId(assignable), "parameter", location));
    } else {
      // only mutate indexed List
      if (!isIndexed(assignable)) {
        compileErrors.push(new MutateCompileError(getId(assignable), "parameter", location));
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
    compileErrors.push(new MutateCompileError(getId(assignable), "loop counter", location));
  }
}

export function mustNotBeConstant(
  assignable: AstNode,
  compileErrors: CompileError[],
  location: string,
) {
  const s = assignable.symbolScope;

  if (s === SymbolScope.program || s === SymbolScope.stdlib) {
    compileErrors.push(new MutateCompileError(getId(assignable), "constant", location));
  }
}

export function mustNotBeCopyOfThis(
  assignable: AstNode,
  compileErrors: CompileError[],
  location: string,
) {
  if (isAstIdNode(assignable) && assignable.id === "copyOfThis") {
    compileErrors.push(
      new SyntaxCompileError("May not assign to special variable 'copyOfThis'", location),
    );
  }
}

export function cannotPassAsOutParameter(
  parameter: AstNode | string,
  compileErrors: CompileError[],
  location: string,
) {
  if (typeof parameter === "string") {
    compileErrors.push(new OutParameterCompileError(parameter, location));
  } else {
    if (isKnownType(parameter.symbolType())) {
      compileErrors.push(new OutParameterCompileError(parameter.toString(), location));
    }
  }
}

export function mustNotBeSameAsMethodName(
  name: string,
  scope: Scope,
  compileErrors: CompileError[],
  location: string,
) {
  if (isSymbol(scope)) {
    const methodName = scope.symbolId;
    if (name === methodName) {
      compileErrors.push(new ParameterNameCompileError(name, location));
    }
  }
}

export function mustBeUniqueNameInScope(
  name: string,
  scope: Scope,
  compileErrors: CompileError[],
  location: string,
) {
  const symbol = scope.resolveSymbol(name, scope);

  if (symbol instanceof DuplicateSymbol) {
    let postFix = "";
    if (
      symbol.duplicates.length ===
      symbol.duplicates.filter((s) => isMember(s) && s.isAbstract).length
    ) {
      postFix = ". Suggestion: factor out the common member(s) into a higher level interface";
    }

    compileErrors.push(new NotUniqueNameCompileError(name, postFix, location));
  }
}

export function mustBeInitialisedInConstructor(
  name: string,
  compileErrors: CompileError[],
  location: string,
) {
  compileErrors.push(
    new SyntaxCompileError(`Property ${name} must be initialised in constructor.`, location),
  );
}

export function mustBeUniqueValueInScope(
  name: string,
  compileErrors: CompileError[],
  location: string,
) {
  compileErrors.push(new NotUniqueNameCompileError(name, "", location));
}

export function mustNotBeLet(symbol: ElanSymbol, compileErrors: CompileError[], location: string) {
  if (symbol instanceof LocalConstantAsn) {
    compileErrors.push(new MutateCompileError(symbol.symbolId, mapToPurpose(symbol), location));
  }
}

function mapToPurpose(symbol: ElanSymbol) {
  if (symbol.symbolScope === SymbolScope.parameter) {
    return "parameter";
  }

  if (isGlobalConstant(symbol)) {
    return "constant";
  }

  if (isFunction(symbol)) {
    return "function";
  }

  if (isProcedure(symbol)) {
    return "procedure";
  }

  if (isLocalConstant(symbol)) {
    return "constant";
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
  if (isKnownType(symbolType) && !isIterableType(symbolType)) {
    compileErrors.push(new InvalidSourceForEachCompileError(location));
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
  compileErrors.push(new NotNewableCompileError(type, location));
}

export function adviseAgainstFunctionRef(
  symbol: ElanSymbol,
  compileErrors: CompileError[],
  location: string,
) {
  if (symbol.symbolType() instanceof FunctionType) {
    compileErrors.push(new FunctionRefCompileError(location));
  }
}

export function adviseAgainstDiv(compileErrors: CompileError[], location: string) {
  compileErrors.push(new DivCompileError(location));
}

export function mustNotBeGlobalFunctionIfRef(
  symbol: ElanSymbol,
  compileErrors: CompileError[],
  location: string,
) {
  if (
    symbol.symbolType() instanceof FunctionType &&
    (symbol.symbolScope === SymbolScope.stdlib || symbol.symbolScope === SymbolScope.member)
  ) {
    compileErrors.push(new NotGlobalFunctionRefCompileError(symbol.symbolId, location));
  }
}

export function mustNotBeTwoUnaryExpressions(compileErrors: CompileError[], location: string) {
  compileErrors.push(new SyntaxCompileError("Unsupported operation.", location));
}

const compilerAssertions = true;

export function compilerAssert(condition: boolean, message: string) {
  if (compilerAssertions && !condition) {
    throw new ElanCompilerError(message);
  }
}
