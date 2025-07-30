import { CompileError } from "../compile-error";
import { AstNode } from "../compiler-interfaces/ast-node";
import { AstQualifierNode } from "../compiler-interfaces/ast-qualifier-node";
import { Class } from "../compiler-interfaces/class";
import { Constant } from "../compiler-interfaces/constant";
import { DeconstructedSymbolType } from "../compiler-interfaces/deconstructed-symbol-type";
import { Definition } from "../compiler-interfaces/definition";
import { ElanSymbol } from "../compiler-interfaces/elan-symbol";
import { GenericSymbolType } from "../compiler-interfaces/generic-symbol-type";
import { Member } from "../compiler-interfaces/member";
import { Property } from "../compiler-interfaces/property";
import { ReifyableSymbolType } from "../compiler-interfaces/reifyable-symbol-type";
import { RootAstNode } from "../compiler-interfaces/root-ast-node";
import { Scope } from "../compiler-interfaces/scope";
import { SymbolType } from "../compiler-interfaces/symbol-type";
import { isRecord } from "../compiler-interfaces/type-options";
import { ElanCompilerError } from "../elan-compiler-error";
import { globalKeyword, libraryKeyword } from "../keywords";
import { isAstIdNode, isAstQualifiedNode, isEmptyNode, isRoot } from "../syntax-nodes/ast-helpers";
import { EmptyAsn } from "../syntax-nodes/empty-asn";
import { EnumAsn } from "../syntax-nodes/globals/enum-asn";
import { TupleAsn } from "../syntax-nodes/globals/tuple-asn";
import { AbstractDefinitionAsn } from "../syntax-nodes/statements/abstract-definition-asn";
import { CallAsn } from "../syntax-nodes/statements/call-asn";
import { DefinitionAdapter } from "../syntax-nodes/statements/definition-adapter";
import { EachAsn } from "../syntax-nodes/statements/each-asn";
import { ForAsn } from "../syntax-nodes/statements/for-asn";
import { BooleanType } from "./boolean-type";
import { ClassType } from "./class-type";
import { DeconstructedListType } from "./deconstructed-list-type";
import { DeconstructedRecordType } from "./deconstructed-record-type";
import { DeconstructedTupleType } from "./deconstructed-tuple-type";
import { ListImmutableName, ListName } from "./elan-type-names";
import { EnumType } from "./enum-type";
import { EnumValueType } from "./enum-value-type";
import { FloatType } from "./float-type";
import { FunctionType } from "./function-type";
import { GenericParameterType } from "./generic-parameter-type";
import { IntType } from "./int-type";
import { NullScope } from "./null-scope";
import { ProcedureType } from "./procedure-type";
import { RegExpType } from "./regexp-type";
import { StringType } from "./string-type";
import { SymbolScope } from "./symbol-scope";
import { TupleType } from "./tuple-type";
import { UnknownSymbol } from "./unknown-symbol";
import { UnknownType } from "./unknown-type";

// interface type-guards

export function isClass(f?: ElanSymbol | Scope): f is Class {
  return !!f && "isClass" in f;
}

export function isGenericClass(f?: ElanSymbol | Scope): f is Class {
  return isClass(f) && f.ofTypes?.length > 0;
}

export function isScope(f?: ElanSymbol | Scope): f is Scope {
  return !!f && "resolveSymbol" in f && "getParentScope" in f;
}

export function isDeconstructedType(s?: SymbolType): s is DeconstructedSymbolType {
  return !!s && "symbolTypeFor" in s;
}

export function isSymbol(s?: ElanSymbol | AstNode): s is ElanSymbol {
  return !!s && "symbolId" in s && "symbolType" in s;
}

export function isGenericSymbolType(s?: SymbolType | GenericSymbolType): s is GenericSymbolType {
  return !!s && "ofTypes" in s;
}

export function isReifyableSymbolType(
  s?: SymbolType | ReifyableSymbolType,
): s is ReifyableSymbolType {
  return !!s && "reify" in s;
}

export function isDefinition(s?: ElanSymbol): s is Definition {
  return !!s && "isLet" in s && "isVariable" in s;
}

export function isConstant(s?: ElanSymbol | Scope): s is Constant {
  return !!s && "isConstant" in s;
}

export function isProperty(s?: ElanSymbol): s is Property {
  return !!s && "isProperty" in s;
}

export function isMember(f?: Member | ElanSymbol): f is Member {
  return !!f && "isMember" in f;
}

// class type-guards

export function isEnum(s?: ElanSymbol): s is EnumAsn {
  return !!s && s instanceof EnumAsn;
}

export function isCall(s?: ElanSymbol | Scope): s is CallAsn {
  return s instanceof CallAsn;
}

export function isListImmutableType(s?: SymbolType): s is ClassType {
  return !!s && s instanceof ClassType && s.className === ListImmutableName;
}

export function isListType(s?: SymbolType): s is ClassType {
  return !!s && s instanceof ClassType && s.className === ListName;
}

export function isClassType(s?: SymbolType): s is ClassType {
  return !!s && "inheritsFrom" in s;
}

export function isNumber(s: SymbolType): s is IntType | FloatType {
  return s instanceof IntType || s instanceof FloatType;
}

export function isFunctionType(s: SymbolType): s is FunctionType {
  return s instanceof FunctionType;
}

// boolean checks

export function isInsideClass(scope: Scope): boolean {
  return getClassScope(scope) !== NullScope.Instance;
}

export function isPublicMember(s: ElanSymbol | Member): boolean {
  return isMember(s) && !s.private;
}

export function isEnumValue(s?: ElanSymbol): boolean {
  return s?.symbolType() instanceof EnumValueType;
}

export function isOutParameter(s?: ElanSymbol): boolean {
  return s?.symbolScope === SymbolScope.outParameter;
}

export function isParameter(s?: ElanSymbol): boolean {
  return s?.symbolScope === SymbolScope.parameter;
}

export function isVariable(s?: ElanSymbol): boolean {
  return isDefinition(s) && s.isVariable();
}

export function isLet(s?: ElanSymbol): boolean {
  return isDefinition(s) && s.isLet();
}

export function isIndexableType(s?: SymbolType): boolean {
  return !!s?.typeOptions.isIndexable;
}

export function isDoubleIndexableType(s?: SymbolType): boolean {
  return !!s?.typeOptions.isDoubleIndexable;
}

export function isIterableType(s?: SymbolType): boolean {
  return !!s?.typeOptions.isIterable;
}

export function isKnownType(symbolType: SymbolType): boolean {
  return !(symbolType instanceof UnknownType);
}

export function isDefinitionStatement(s: Scope): boolean {
  return s instanceof AbstractDefinitionAsn || s instanceof EachAsn || s instanceof ForAsn;
}

export function isValueType(type: SymbolType): boolean {
  return (
    type instanceof IntType ||
    type instanceof FloatType ||
    type instanceof BooleanType ||
    type instanceof StringType ||
    type instanceof EnumType ||
    type instanceof RegExpType
  );
}

export function isProcedure(s: ElanSymbol): boolean {
  return s.symbolType() instanceof ProcedureType;
}

export function isFunction(s: ElanSymbol): boolean {
  return s.symbolType() instanceof FunctionType;
}

export function isPureFunction(s: ElanSymbol): boolean {
  if (isFunction(s)) {
    const ft = s.symbolType();
    return ft instanceof FunctionType && ft.isPure;
  }
  return false;
}

export function isSystemFunction(s: ElanSymbol): boolean {
  if (isFunction(s)) {
    const ft = s.symbolType();
    return ft instanceof FunctionType && !ft.isPure;
  }
  return false;
}

export function isTypeName(s?: ElanSymbol): boolean {
  return firstCharIsUpper(s?.symbolId ?? "");
}

export function isAbstractClass(s?: ElanSymbol): boolean {
  return isClass(s) && s.isAbstract;
}

export function isNotInheritableClass(s?: ElanSymbol): boolean {
  return isClass(s) && s.isNotInheritable;
}

export function isConcreteTypeName(s?: ElanSymbol): boolean {
  return isTypeName(s) && !isAbstractClass(s);
}

export function isAbstractTypeName(s?: ElanSymbol): boolean {
  return isTypeName(s) && isAbstractClass(s) && !isNotInheritableClass(s);
}

export function isNotInheritableTypeName(s?: ElanSymbol): boolean {
  return isTypeName(s) && isAbstractClass(s) && isNotInheritableClass(s);
}

export function isId(f: ElanSymbol): boolean {
  return (
    isConstant(f) ||
    isLet(f) ||
    isVariable(f) ||
    isParameter(f) ||
    isOutParameter(f) ||
    isProperty(f) ||
    isEnumValue(f)
  );
}

function isNotFuncOrProcOrType(s: ElanSymbol): boolean {
  const st = s.symbolType();
  return !(
    st instanceof FunctionType ||
    st instanceof ProcedureType ||
    firstCharIsUpper(s.symbolId)
  );
}

export function isPossibleExtensionForType(
  actualType: SymbolType,
  procType: ProcedureType,
): boolean {
  if (procType.parameterTypes.length > 0) {
    const firstParmType = procType.parameterTypes[0];
    return matchType(actualType, firstParmType);
  }

  return false;
}

export function isMemberOnFieldsClass(s: ElanSymbol, scope: Scope): boolean {
  const currentClass = getClassScope(scope);
  const matchingMember = currentClass.resolveSymbol(s.symbolId, scope);
  return isMember(s) && isMember(matchingMember) && s.getClass() === matchingMember.getClass();
}

export function scopePrefix(
  symbol: ElanSymbol,
  _compileErors: CompileError[],
  scope: Scope,
  _location: string,
) {
  if (symbol.symbolScope === SymbolScope.stdlib) {
    return `_stdlib.`;
  }

  if (isConstant(symbol) && symbol.symbolScope === SymbolScope.program) {
    return isConstant(scope) ? "this." : "global.";
  }

  if (symbol.symbolScope === SymbolScope.member) {
    return `this.`;
  }

  if (isFunction(symbol) && symbol.symbolScope === SymbolScope.program) {
    return "global.";
  }

  return "";
}

function internalUpdateScopeAndQualifier(
  qualifierScope: SymbolType,
  currentScope: Scope,
  value: AstNode,
  qualifier: AstNode,
): [AstNode, Scope] {
  if (qualifierScope instanceof ClassType) {
    const classSymbol = currentScope.resolveSymbol(qualifierScope.className, currentScope);
    // replace scope with class scope
    currentScope = isScope(classSymbol) ? classSymbol : currentScope;

    if (isClass(currentScope)) {
      if (isClass(qualifierScope.scope)) {
        currentScope = currentScope.updateOfTypes(qualifierScope.scope.ofTypes);
      }
    }
  } else if (qualifierScope instanceof TupleType) {
    currentScope = new TupleAsn(qualifierScope, currentScope);
  } else if (isAstIdNode(value) && value.id === libraryKeyword) {
    currentScope = getGlobalScope(currentScope).libraryScope;
    qualifier = EmptyAsn.Instance;
  } else if (isAstIdNode(value) && value.id === globalKeyword) {
    currentScope = getGlobalScope(currentScope);
  } else if (!isEmptyNode(qualifier)) {
    currentScope = getGlobalScope(currentScope).libraryScope;
  } else {
    currentScope = currentScope.getParentScope();
  }
  return [qualifier, currentScope];
}

export function updateScopeAndQualifier(rootNode: AstNode, currentScope: Scope): [AstNode, Scope] {
  const qualifier = isAstQualifiedNode(rootNode) ? rootNode.qualifier : EmptyAsn.Instance;
  const qualifierScope = qualifier.symbolType();
  const value = qualifier.value;

  return internalUpdateScopeAndQualifier(qualifierScope, currentScope, value, qualifier);
}

export function updateScopeInChain(qualifier: AstNode, currentScope: Scope): Scope {
  const qualifierScope = qualifier?.symbolType();

  const [, newScope] = internalUpdateScopeAndQualifier(
    qualifierScope,
    currentScope,
    qualifier,
    qualifier,
  );

  return newScope;
}

export function getGlobalScope(start: Scope): RootAstNode {
  if (start instanceof NullScope) {
    throw new ElanCompilerError("Global scope not found");
  }

  if (isRoot(start)) {
    return start;
  }

  return getGlobalScope(start.getParentScope());
}

export function getClassScope(start: Scope): Class | NullScope {
  if (start instanceof NullScope) {
    return start;
  }

  if (isClass(start)) {
    return start;
  }

  return getClassScope(start.getParentScope());
}

export function matchType(actualType: SymbolType, paramType: SymbolType): boolean {
  if (paramType.name === actualType.name) {
    return true;
  }

  if (paramType instanceof GenericParameterType) {
    return true;
  }

  if (paramType instanceof ClassType) {
    return paramType.isAssignableFrom(actualType);
  }

  return false;
}

export function firstCharIsUpper(s: string) {
  const firstChar = s[0] ?? "";
  return firstChar.toUpperCase() === firstChar;
}

export function matchingSymbolsWithQualifier(
  propId: string,
  qualId: string,
  scope: Scope,
): ElanSymbol[] {
  const qual = scope.resolveSymbol(qualId, scope);

  if (qual instanceof UnknownSymbol) {
    return [];
  }

  // class scope so all or matching symbols on class
  let qualSt = qual.symbolType();

  if (isFunctionType(qualSt)) {
    qualSt = qualSt.returnType;
  }

  let qualifiedSymbols: ElanSymbol[] = [];

  if (qualSt instanceof ClassType) {
    const cls = getGlobalScope(scope).resolveSymbol(qualSt.className, scope);

    if (isClass(cls)) {
      qualifiedSymbols = cls
        .symbolMatches(propId, !propId, NullScope.Instance)
        .filter((s) => isPublicMember(s));
    }
  }

  if (qualSt instanceof EnumType) {
    const en = getGlobalScope(scope).resolveSymbol(qualSt.name, scope);

    if (isEnum(en)) {
      qualifiedSymbols = en.symbolMatches(propId, !propId, NullScope.Instance);
    }
  }

  if (qualSt instanceof TupleType) {
    qualifiedSymbols = new TupleAsn(qualSt, scope).symbolMatches(
      propId,
      !propId,
      NullScope.Instance,
    );
  }

  const allExtensions = getGlobalScope(scope)
    .libraryScope.symbolMatches(propId, !propId, NullScope.Instance)
    .filter((s) => {
      const st = s.symbolType();
      return (
        (st instanceof ProcedureType || st instanceof FunctionType) &&
        st.isExtension &&
        isPossibleExtensionForType(qualSt, st)
      );
    });

  return qualifiedSymbols.concat(allExtensions);
}

export function orderSymbol(s1: ElanSymbol, s2: ElanSymbol) {
  return s1.symbolId.localeCompare(s2.symbolId);
}

export function updateScope(qualifier: AstQualifierNode | EmptyAsn, originalScope: Scope) {
  let currentScope = originalScope;
  const classScope = qualifier.symbolType();
  if (classScope instanceof ClassType) {
    const classSymbol = originalScope.resolveSymbol(classScope.className, originalScope);
    // replace scope with class scope
    currentScope = isScope(classSymbol) ? classSymbol : originalScope;
  } else {
    currentScope = originalScope.getParentScope();
  }

  return currentScope;
}

export function getDeconstructionIds(sid: string) {
  if (sid.includes(",")) {
    return sid.split(",").map((s) => s.trim());
  }
  if (sid.includes(":")) {
    return sid.split(":").map((s) => s.trim());
  }
  return [sid];
}

function fixCase(id: string, s: ElanSymbol): [string, string] {
  let sid = s.symbolId;
  if (!hasAnyUpperCase(id)) {
    id = id.toUpperCase();
    sid = sid.toUpperCase();
  }
  return [id, sid];
}

function matchStart(i: string, s: ElanSymbol) {
  const [id, sid] = fixCase(i, s);
  return sid.startsWith(id);
}

function hasAnyUpperCase(id: string): boolean {
  return Array.from(id).filter((c) => c.toUpperCase() === c).length > 0;
}

function matchIncludes(i: string, s: ElanSymbol) {
  const [id, sid] = fixCase(i, s);
  return sid.includes(id);
}

export function symbolMatches(id: string, all: boolean, symbols: ElanSymbol[]) {
  if (all) {
    return symbols;
  }
  const sw = symbols.filter((s) => matchStart(id, s));
  let inc: ElanSymbol[] = [];
  const limit = 1; // only add includes if >= limit

  if (id.length >= limit) {
    inc = symbols.filter((s) => !sw.includes(s)).filter((s) => matchIncludes(id, s));
  }

  return sw.concat(inc);
}

export function symbolScopeToFriendlyName(ss: SymbolScope) {
  switch (ss) {
    case SymbolScope.member:
      return "property";
    case SymbolScope.parameter:
    case SymbolScope.outParameter:
      return "parameter";
    default:
      return "identifier";
  }
}

export function parameterNamesWithTypes(st: SymbolType, actualTypes?: SymbolType[]) {
  if (st instanceof ProcedureType || st instanceof FunctionType) {
    const parameterNames = st.isExtension ? st.parameterNames.slice(1) : st.parameterNames;
    let parameterTypes = actualTypes ? actualTypes : st.parameterTypes;
    parameterTypes = st.isExtension ? parameterTypes.slice(1) : parameterTypes;
    const descriptions = parameterNames.map((n, i) => `${n} (${parameterTypes[i].name})`);
    return descriptions;
  }
  return [];
}

export function parameterNames(st: SymbolType) {
  if (st instanceof ProcedureType || st instanceof FunctionType) {
    const parameterNames = st.isExtension ? st.parameterNames.slice(1) : st.parameterNames;
    const descriptions = parameterNames.map((n) => `${n}`);
    return descriptions;
  }
  return [];
}

export function allScopedSymbols(scope: Scope, initialScope: Scope) {
  return scope.symbolMatches("", true, initialScope).filter((s) => isNotFuncOrProcOrType(s));
}

export function getIds(sid: string) {
  if (sid.includes(",")) {
    return sid.split(",").map((s) => s.trim());
  }
  if (sid.includes(":")) {
    return sid.split(":").map((s) => s.trim());
  }
  return [sid];
}

export function handleDeconstruction(ss: ElanSymbol[]) {
  const newSymbols: ElanSymbol[] = [];

  for (const s of ss) {
    const ids = getDeconstructionIds(s.symbolId);

    if (ids.length === 1) {
      newSymbols.push(s);
    } else {
      for (let i = 0; i < ids.length; i++) {
        newSymbols.push(new DefinitionAdapter(s, i));
      }
    }
  }

  return newSymbols;
}

export function mostPreciseSymbol(lhs: SymbolType, rhs: SymbolType): SymbolType {
  if (lhs instanceof FloatType || rhs instanceof FloatType) {
    return FloatType.Instance;
  }

  return lhs;
}

export function allPropertiesInScope(scope: Scope) {
  const all = scope.symbolMatches("", true, scope);
  return all.filter((s) => isProperty(s)) as ElanSymbol[];
}

export function mapSymbolType(ids: string[], st: SymbolType) {
  if (ids.length > 1 && st instanceof TupleType) {
    return new DeconstructedTupleType(ids, st.ofTypes);
  }

  if (ids.length > 1 && st instanceof ClassType && isRecord(st.typeOptions)) {
    return new DeconstructedRecordType(ids, st.scope as Class);
  }

  if (ids.length === 2 && st instanceof ClassType && st.typeOptions.isIterable) {
    return new DeconstructedListType(ids[0], ids[1], st.ofTypes[0], st);
  }

  return st;
}

export function displayName(symbol: ElanSymbol, id: string) {
  const type = symbol.symbolType();
  if (isDeconstructedType(type)) {
    return id;
  }
  return symbol.symbolId;
}
