import { ElanCompilerError } from "../../elan-compiler-error";
import { CompileError } from "../compile-error";
import { AstNode } from "../compiler-interfaces/ast-node";
import { AstQualifierNode } from "../compiler-interfaces/ast-qualifier-node";
import { Class } from "../compiler-interfaces/class";
import { DeconstructedSymbolType } from "../compiler-interfaces/deconstructed-symbol-type";
import { ElanSymbol } from "../compiler-interfaces/elan-symbol";
import { GenericSymbolType } from "../compiler-interfaces/generic-symbol-type";
import { ReifyableSymbolType } from "../compiler-interfaces/reifyable-symbol-type";
import { RootAstNode } from "../compiler-interfaces/root-ast-node";
import { Scope } from "../compiler-interfaces/scope";
import { SymbolType } from "../compiler-interfaces/symbol-type";
import { Member } from "../compiler-interfaces/member";
import { globalKeyword, libraryKeyword, propertyKeyword } from "../keywords";
import { KeywordCompletion, SymbolCompletionSpec, TokenType } from "../symbol-completion-helpers";
import { isAstIdNode, isAstQualifiedNode, isEmptyNode } from "../syntax-nodes/ast-helpers";
import { PropertyAsn } from "../syntax-nodes/class-members/property-asn";
import { EmptyAsn } from "../syntax-nodes/empty-asn";
import { EnumAsn } from "../syntax-nodes/globals/enum-asn";
import { AbstractDefinitionAsn } from "../syntax-nodes/statements/abstract-definition-asn";
import { CallAsn } from "../syntax-nodes/statements/call-asn";
import { DefinitionAdapter } from "../syntax-nodes/statements/definition-adapter";
import { EachAsn } from "../syntax-nodes/statements/each-asn";
import { ForAsn } from "../syntax-nodes/statements/for-asn";
import { BooleanType } from "./boolean-type";
import { ClassType } from "./class-type";
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
import { UnknownSymbol } from "./unknown-symbol";
import { UnknownType } from "./unknown-type";
import { isRecord } from "../compiler-interfaces/type-options";
import { DeconstructedListType } from "./deconstructed-list-type";
import { DeconstructedRecordType } from "./deconstructed-record-type";
import { DeconstructedTupleType } from "./deconstructed-tuple-type";
import { TupleType } from "./tuple-type";

export function isClass(f?: ElanSymbol | Scope): f is Class {
  return !!f && "isClass" in f;
}

export function isGenericClass(f?: ElanSymbol | Scope): f is Class {
  return isClass(f) && f.ofTypes?.length > 0;
}

export function isConstant(f?: ElanSymbol | Scope): f is ElanSymbol {
  return !!f && "isConstant" in f;
}

export function isScope(f?: ElanSymbol | Scope): f is Scope {
  return !!f && "resolveSymbol" in f && "getParentScope" in f;
}

export function isDeconstructedType(s?: SymbolType): s is DeconstructedSymbolType {
  return !!s && "symbolTypeFor" in s;
}

export function isListImmutableType(s?: SymbolType): s is ClassType {
  return !!s && s instanceof ClassType && s.className === ListImmutableName;
}

export function isListType(s?: SymbolType): s is ClassType {
  return !!s && s instanceof ClassType && s.className === ListName;
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

export function isSymbol(s?: ElanSymbol | AstNode): s is ElanSymbol {
  return !!s && "symbolId" in s && "symbolType" in s;
}

export function isGenericSymbolType(s?: SymbolType | GenericSymbolType): s is GenericSymbolType {
  return !!s && "ofTypes" in s;
}

export function isClassType(s?: SymbolType): s is ClassType {
  return !!s && "inheritsFrom" in s;
}

export function isReifyableSymbolType(
  s?: SymbolType | ReifyableSymbolType,
): s is ReifyableSymbolType {
  return !!s && "reify" in s;
}

export function isVariable(s?: ElanSymbol): boolean {
  return !!s && "isVariable" in s;
}

export function isLet(s?: ElanSymbol): boolean {
  return !!s && "isLet" in s;
}

export function isCallStatement(s?: ElanSymbol | Scope): s is CallAsn {
  return !!s && "isCall" in s;
}

export function isProperty(s?: ElanSymbol): s is PropertyAsn {
  return !!s && "isProperty" in s;
}

export function isOutParameter(s?: ElanSymbol): boolean {
  return !!s && s.symbolScope === SymbolScope.outParameter;
}

export function isParameter(s?: ElanSymbol): boolean {
  return !!s && s.symbolScope === SymbolScope.parameter;
}

export function isClassTypeDef(s?: ElanSymbol | Scope): s is Class {
  return !!s && "updateOfTypes" in s;
}

export function isEnumValue(s?: ElanSymbol): boolean {
  return !!s && s.symbolType() instanceof EnumValueType;
}

export function isEnum(s?: ElanSymbol): boolean {
  return !!s && s instanceof EnumAsn;
}

export function isEnumDef(s?: ElanSymbol): s is EnumAsn {
  return !!s && s instanceof EnumAsn;
}

export function isMember(f?: Member | ElanSymbol): f is Member {
  return !!f && "isMember" in f;
}

export function isMemberOnFieldsClass(s: ElanSymbol, scope: Scope) {
  const currentClass = getClassScope(scope);
  const matchingMember = currentClass.resolveSymbol(s.symbolId, scope);
  return isMember(s) && isMember(matchingMember) && s.getClass() === matchingMember.getClass();
}

export function isInsideClass(scope: Scope) {
  return getClassScope(scope) !== NullScope.Instance;
}

export function isPublicMember(s: ElanSymbol | Member): boolean {
  return isMember(s) && !s.private;
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

    if (isClassTypeDef(currentScope)) {
      if (isClass(qualifierScope.scope)) {
        currentScope = currentScope.updateOfTypes(qualifierScope.scope.ofTypes);
      }
    }
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

export function isRoot(f?: Scope | AstNode): f is RootAstNode {
  return !!f && "isFile" in f;
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

  if (isClassTypeDef(start)) {
    return start;
  }

  return getClassScope(start.getParentScope());
}

export function isValueType(type: SymbolType) {
  return (
    type instanceof IntType ||
    type instanceof FloatType ||
    type instanceof BooleanType ||
    type instanceof StringType ||
    type instanceof EnumType ||
    type instanceof RegExpType
  );
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

export function isPossibleExtensionForType(actualType: SymbolType, procType: ProcedureType) {
  if (procType.parameterTypes.length > 0) {
    const firstParmType = procType.parameterTypes[0];
    return matchType(actualType, firstParmType);
  }

  return false;
}

export function isProcedure(s: ElanSymbol) {
  return s.symbolType() instanceof ProcedureType;
}

export function isFunction(s: ElanSymbol) {
  return s.symbolType() instanceof FunctionType;
}

export function isPureFunction(s: ElanSymbol) {
  if (isFunction(s)) {
    const ft = s.symbolType();
    return ft instanceof FunctionType && ft.isPure;
  }
  return false;
}

export function isSystemFunction(s: ElanSymbol) {
  if (isFunction(s)) {
    const ft = s.symbolType();
    return ft instanceof FunctionType && !ft.isPure;
  }
  return false;
}

export function isFunctionType(s: SymbolType): s is FunctionType {
  return !!s && s instanceof FunctionType;
}

export function firstCharIsUpper(s: string) {
  const firstChar = s[0] ?? "";
  return firstChar.toUpperCase() === firstChar;
}

export function isTypeName(s?: ElanSymbol) {
  return firstCharIsUpper(s?.symbolId ?? "");
}

export function isAbstractClass(s?: ElanSymbol) {
  return isClass(s) && s.isAbstract;
}

export function isNotInheritableClass(s?: ElanSymbol) {
  return isClass(s) && s.isNotInheritable;
}

export function isConcreteTypeName(s?: ElanSymbol) {
  return isTypeName(s) && !isAbstractClass(s);
}

export function isAbstractTypeName(s?: ElanSymbol) {
  return isTypeName(s) && isAbstractClass(s) && !isNotInheritableClass(s);
}

export function isNotInheritableTypeName(s?: ElanSymbol) {
  return isTypeName(s) && isAbstractClass(s) && isNotInheritableClass(s);
}

function matchingSymbolsWithQualifier(propId: string, qualId: string, scope: Scope): ElanSymbol[] {
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

    if (isClassTypeDef(cls)) {
      qualifiedSymbols = cls
        .symbolMatches(propId, !propId, NullScope.Instance)
        .filter((s) => isPublicMember(s));
    }
  }

  if (qualSt instanceof EnumType) {
    const en = getGlobalScope(scope).resolveSymbol(qualSt.name, scope);

    if (isEnumDef(en)) {
      qualifiedSymbols = en.symbolMatches(propId, !propId, NullScope.Instance);
    }
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

export function matchingSymbols(spec: SymbolCompletionSpec, scope: Scope): ElanSymbol[] {
  if (spec.context) {
    return matchingSymbolsWithQualifier(spec.toMatch, spec.context, scope);
  }

  const allNotExtensions = scope.symbolMatches(spec.toMatch, !spec.toMatch, scope).filter((s) => {
    const st = s.symbolType();
    let isCall = false;
    let isExtension = false;

    if (st instanceof ProcedureType || st instanceof FunctionType) {
      isCall = true;
      isExtension = st.isExtension;
    }
    return !isCall || (isCall && !isExtension);
  });

  return allNotExtensions;
}

export function removeIfSingleFullMatch(symbols: ElanSymbol[], id: string): ElanSymbol[] {
  if (symbols.length === 1 && symbols[0].symbolId === id) {
    return [];
  } else {
    return symbols;
  }
}

export function orderSymbol(s1: ElanSymbol, s2: ElanSymbol) {
  return s1.symbolId.localeCompare(s2.symbolId);
}

function filterSymbols(matches: ElanSymbol[], filters: ((s: ElanSymbol) => boolean)[]) {
  let filtered: ElanSymbol[] = [];

  for (const f of filters) {
    filtered = filtered.concat(matches.filter(f));
  }

  return filtered.filter((e) => !e.symbolId.startsWith("_"));
}

function ensureUnique(symbols: ElanSymbol[]) {
  const uniqueNames = Array.from(new Set<string>(symbols.map((s) => s.symbolId)));
  return uniqueNames.map((n) => symbols.find((s) => s.symbolId === n)) as ElanSymbol[];
}

export function filteredSymbols(spec: SymbolCompletionSpec, scope: Scope): ElanSymbol[] {
  const matches = matchingSymbols(spec, scope);
  const filters = filtersForTokenType(spec.tokenTypes);
  const filtered = ensureUnique(filterSymbols(matches, filters));

  const startsWith = filtered
    .filter((s) => s.symbolId.toUpperCase().startsWith(spec.toMatch.toUpperCase()))
    .sort(orderSymbol);
  const includes = filtered.filter((s) => !startsWith.includes(s)).sort(orderSymbol);
  return startsWith.concat(includes);
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

export function isId(f: ElanSymbol): f is ElanSymbol {
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

export function filterForTokenType(tt: TokenType): (s?: ElanSymbol) => boolean {
  switch (tt) {
    case TokenType.method_function:
      return (s?: ElanSymbol) => isPureFunction(s!);
    case TokenType.method_procedure:
      return (s?: ElanSymbol) => isProcedure(s!);
    case TokenType.method_system:
      return (s?: ElanSymbol) => isSystemFunction(s!);
    case TokenType.type_concrete:
      return isConcreteTypeName;
    case TokenType.type_abstract:
      return isAbstractTypeName;
    case TokenType.type_enum:
      return isEnum;
    case TokenType.type_notInheritable:
      return isNotInheritableTypeName;
    case TokenType.id_constant:
      return isConstant;
    case TokenType.id_let:
      return isLet;
    case TokenType.id_variable:
      return isVariable;
    case TokenType.id_parameter_regular:
      return isParameter;
    case TokenType.id_parameter_out:
      return isOutParameter;
    case TokenType.id_property:
      return isProperty;
    case TokenType.id_enumValue:
      return isEnumValue;
  }
}

export function filtersForTokenType(tokenTypes: Set<TokenType>): ((s?: ElanSymbol) => boolean)[] {
  const filters: ((s?: ElanSymbol) => boolean)[] = [];

  for (const f of tokenTypes) {
    filters.push(filterForTokenType(f));
  }

  return filters;
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

function isNotFuncOrProcOrType(s: ElanSymbol) {
  const st = s.symbolType();
  return !(
    st instanceof FunctionType ||
    st instanceof ProcedureType ||
    firstCharIsUpper(s.symbolId)
  );
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

export function isNumber(st: SymbolType) {
  return st instanceof IntType || st instanceof FloatType;
}

export function knownType(symbolType: SymbolType) {
  return !(symbolType instanceof UnknownType);
}

export function isDefinitionStatement(s: Scope): boolean {
  return s instanceof AbstractDefinitionAsn || s instanceof EachAsn || s instanceof ForAsn;
}

function allPropertiesInScope(scope: Scope) {
  const all = scope.symbolMatches("", true, scope);
  return all.filter((s) => isProperty(s)) as ElanSymbol[];
}

export function getFilteredSymbols(
  spec: SymbolCompletionSpec,
  ast: RootAstNode | undefined,
  htmlId: string,
) {
  const scope = ast?.getScopeById(htmlId) ?? NullScope.Instance;
  let symbols = filteredSymbols(spec, scope);
  if (isInsideClass(scope)) {
    if (propertyKeyword.startsWith(spec.toMatch)) {
      const allProperties = allPropertiesInScope(getClassScope(scope)).sort(orderSymbol);
      symbols = symbols.filter((s) => !allProperties.includes(s)).concat(allProperties);
    } else if (spec.context === propertyKeyword) {
      const newSpec = new SymbolCompletionSpec(
        spec.toMatch,
        new Set<TokenType>([TokenType.id_property]),
        new Set<KeywordCompletion>(),
        "",
      );
      symbols = filteredSymbols(newSpec, scope);
    }
  }
  return symbols;
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
