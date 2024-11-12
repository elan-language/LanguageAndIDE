import { ElanCompilerError } from "../../elan-compiler-error";
import { Property } from "../class-members/property";
import { CompileError } from "../compile-error";
import {
  cannotAccessAbstractMemberInAbstractClass,
  cannotAccessPrivateMemberInAbstractClass,
} from "../compile-rules";
import { ClassFrame } from "../globals/class-frame";
import { isClass, isConstant, isFile, isMember, isScope, TokenType } from "../helpers";
import { AstNode } from "../interfaces/ast-node";
import { AstQualifierNode } from "../interfaces/ast-qualifier-node";
import { Class } from "../interfaces/class";
import { DeconstructedSymbolType } from "../interfaces/deconstructed-symbol-type";
import { DictionarySymbolType } from "../interfaces/dictionary-symbol-type";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { File } from "../interfaces/file";
import { Frame } from "../interfaces/frame";
import { GenericSymbolType } from "../interfaces/generic-symbol-type";
import { IterableSymbolType } from "../interfaces/iterable-symbol-type";
import { Member } from "../interfaces/member";
import { Parent } from "../interfaces/parent";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { libraryKeyword, toKeyword, withKeyword } from "../keywords";
import { Qualifier } from "../parse-nodes/qualifier";
import { isAstIdNode, isAstQualifiedNode, transforms } from "../syntax-nodes/ast-helpers";
import { Transforms } from "../syntax-nodes/transforms";
import { AbstractDictionaryType } from "./abstract-dictionary-type";
import { AbstractListType } from "./abstract-list-type";
import { ArrayType } from "./array-list-type";
import { BooleanType } from "./boolean-type";
import { ClassType } from "./class-type";
import { DictionaryType } from "./dictionary-type";
import { FloatType } from "./float-type";
import { FunctionType } from "./function-type";
import { GenericParameterType } from "./generic-parameter-type";
import { ImmutableDictionaryType } from "./immutable-dictionary-type";
import { IntType } from "./int-type";
import { IterableType } from "./iterable-type";
import { ListType } from "./list-type";
import { NullScope } from "./null-scope";
import { ProcedureType } from "./procedure-type";
import { RegexType } from "./regex-type";
import { StringType } from "./string-type";
import { SymbolScope } from "./symbol-scope";

export function isDeconstructedType(s?: SymbolType): s is DeconstructedSymbolType {
  return !!s && "symbolTypeFor" in s;
}

export function isIterableType(s?: SymbolType): s is IterableSymbolType {
  return !!s && "isIterable" in s;
}

export function isAnyDictionaryType(s?: SymbolType): s is DictionarySymbolType {
  return !!s && "keyType" in s && "valueType" in s;
}

export function isConcreteDictionaryType(
  s?: SymbolType,
): s is DictionaryType | ImmutableDictionaryType {
  return s instanceof DictionaryType || s instanceof ImmutableDictionaryType;
}

export function isListType(s?: SymbolType): s is AbstractListType {
  return s instanceof AbstractListType;
}

export function isIndexableType(s?: SymbolType): s is IterableSymbolType {
  return isIterableType(s) && !(s instanceof IterableType);
}

export function isSymbol(s?: Parent | Frame | ElanSymbol): s is ElanSymbol {
  return !!s && "symbolId" in s && "symbolType" in s;
}

export function isGenericSymbolType(s?: SymbolType | GenericSymbolType): s is GenericSymbolType {
  return !!s && "ofType" in s;
}

export function isVarStatement(s?: ElanSymbol): boolean {
  return !!s && "isVarStatement" in s;
}

export function isProperty(s?: ElanSymbol): s is Property {
  return !!s && "isProperty" in s;
}

export function isVarOrPropertyStatement(s?: ElanSymbol): boolean {
  return !!s && (isVarStatement(s) || isProperty(s));
}

export function isClassTypeDef(s?: ElanSymbol | Scope): s is Class {
  return !!s && "genericParamMatches" in s;
}

export function isMemberOnFieldsClass(s: ElanSymbol, transforms: Transforms, scope: Scope) {
  const currentClass = getClassScope(scope);
  const matchingMember = currentClass.resolveSymbol(s.symbolId, transforms, scope);
  return isMember(s) && isMember(matchingMember) && s.getClass() === matchingMember.getClass();
}

export function isInsideClass(scope: Scope) {
  return getClassScope(scope) !== NullScope.Instance;
}

export function isPrivateMember(s: ElanSymbol | Member): boolean {
  return isMember(s) && s.private;
}

export function isPublicMember(s: ElanSymbol | Member): boolean {
  return isMember(s) && !s.private;
}

export function scopePrefix(
  symbol: ElanSymbol,
  compileErors: CompileError[],
  scope: Scope,
  location: string,
) {
  if (symbol.symbolScope === SymbolScope.stdlib) {
    return `_stdlib.`;
  }

  if (isConstant(symbol) && symbol.symbolScope === SymbolScope.program) {
    return isConstant(scope) ? "this." : "global.";
  }

  if (isMember(symbol)) {
    const symbolClass = symbol.getClass();
    const thisClass = getClassScope(scope);

    if (symbol.private && symbolClass !== thisClass) {
      if (isClassTypeDef(thisClass) && thisClass.abstract) {
        cannotAccessPrivateMemberInAbstractClass(symbol.symbolId, compileErors, location);
      }

      return `this._${symbolClass.symbolId}.`;
    }

    if (symbol.isAbstract && isClassTypeDef(thisClass) && thisClass.abstract) {
      cannotAccessAbstractMemberInAbstractClass(symbol.symbolId, compileErors, location);
    }
  }

  if (symbol.symbolScope === SymbolScope.member) {
    return `this.`;
  }

  return "";
}

function internalUpdateScopeAndQualifier(
  qualifierScope: SymbolType | undefined,
  currentScope: Scope,
  transforms: Transforms,
  value: AstNode | undefined,
  qualifier: AstNode | undefined,
): [AstNode | undefined, Scope] {
  if (qualifierScope instanceof ClassType) {
    const classSymbol = currentScope.resolveSymbol(
      qualifierScope.className,
      transforms,
      currentScope,
    );
    // replace scope with class scope
    currentScope = isScope(classSymbol) ? classSymbol : currentScope;
  } else if (isAstIdNode(value) && value.id === libraryKeyword) {
    currentScope = getGlobalScope(currentScope).libraryScope;
    qualifier = undefined;
  } else if (qualifier) {
    currentScope = getGlobalScope(currentScope).libraryScope;
  } else {
    currentScope = currentScope.getParentScope();
  }
  return [qualifier, currentScope];
}

export function updateScopeAndQualifier(
  rootNode: AstNode,
  transforms: Transforms,
  currentScope: Scope,
): [AstNode | undefined, Scope] {
  const qualifier = isAstQualifiedNode(rootNode) ? rootNode.qualifier : undefined;
  const qualifierScope = qualifier?.symbolType();
  const value = qualifier?.value;

  return internalUpdateScopeAndQualifier(
    qualifierScope,
    currentScope,
    transforms,
    value,
    qualifier,
  );
}

export function updateScopeInChain(
  qualifier: AstNode,
  transforms: Transforms,
  currentScope: Scope,
): Scope {
  const qualifierScope = qualifier?.symbolType();

  const [, newScope] = internalUpdateScopeAndQualifier(
    qualifierScope,
    currentScope,
    transforms,
    qualifier,
    qualifier,
  );

  return newScope;
}

export function getGlobalScope(start: Scope): File {
  if (start instanceof NullScope) {
    throw new ElanCompilerError("Global scope not found");
  }

  if (isFile(start)) {
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

export function wrapScopeInScope(wrapped: Scope): Scope {
  return {
    resolveSymbol: (id: string | undefined, transforms: Transforms, scope: Scope) =>
      wrapped.resolveSymbol(id, transforms, scope),

    getParentScope: () => wrapped,

    symbolMatches: (id: string, all: boolean, initialScope?: Scope) =>
      wrapped.symbolMatches(id, all, initialScope),
  };
}

export function isValueType(type: SymbolType) {
  return (
    type instanceof IntType ||
    type instanceof FloatType ||
    type instanceof BooleanType ||
    type instanceof StringType ||
    type instanceof RegexType
  );
}

function matchGenericTypes(actualType: SymbolType, paramType: SymbolType) {
  if (paramType.constructor.name === actualType.constructor.name) {
    return true;
  }

  if (
    paramType instanceof IterableType &&
    (actualType instanceof ListType || actualType instanceof ArrayType)
  ) {
    return true;
  }

  return false;
}

function matchDictionaryTypes(actualType: SymbolType, paramType: SymbolType) {
  if (paramType.constructor.name === actualType.constructor.name) {
    return true;
  }

  if (
    paramType instanceof AbstractDictionaryType &&
    (actualType instanceof DictionaryType || actualType instanceof ImmutableDictionaryType)
  ) {
    return true;
  }

  return false;
}

export function matchType(actualType: SymbolType, paramType: SymbolType): boolean {
  if (paramType.name === actualType.name) {
    return true;
  }

  if (paramType instanceof GenericParameterType) {
    return true;
  }

  if (isGenericSymbolType(paramType) && isGenericSymbolType(actualType)) {
    return (
      matchGenericTypes(actualType, paramType) &&
      (paramType.ofType instanceof GenericParameterType ||
        matchType(actualType.ofType, paramType.ofType))
    );
  }

  if (isAnyDictionaryType(paramType) && isAnyDictionaryType(actualType)) {
    return (
      matchDictionaryTypes(actualType, paramType) &&
      (paramType.keyType instanceof GenericParameterType ||
        matchType(actualType.keyType, paramType.keyType)) &&
      (paramType.valueType instanceof GenericParameterType ||
        matchType(actualType.valueType, paramType.valueType))
    );
  }

  if (paramType instanceof ClassType) {
    return paramType.isAssignableFrom(actualType);
  }

  // Todo when we have extensions on Class

  return false;
}

export function isPossibleExtensionForType(actualType: SymbolType, procType: ProcedureType) {
  if (procType.parametersTypes.length > 0) {
    const firstParmType = procType.parametersTypes[0];
    return matchType(actualType, firstParmType);
  }

  return false;
}

export function isProcedure(s: ElanSymbol, transforms: Transforms) {
  return s.symbolType(transforms) instanceof ProcedureType;
}

export function isFunction(s: ElanSymbol, transforms: Transforms) {
  return s.symbolType(transforms) instanceof FunctionType;
}

export function isFunctionType(s: SymbolType): s is FunctionType {
  return !!s && s instanceof FunctionType;
}

export function isIdOrProcedure(s: ElanSymbol, transforms: Transforms) {
  return isProcedure(s, transforms) || isVarStatement(s);
}

export function isExpression(s: ElanSymbol, transforms: Transforms) {
  return !isProcedure(s, transforms);
}

export function isTypeName(s?: ElanSymbol) {
  const firstChar = s?.symbolId[0] ?? "";
  return firstChar.toUpperCase() === firstChar;
}

function upToParams(id: string) {
  const openParamsIndex = id.indexOf("(");
  return openParamsIndex >= 0 ? id.slice(0, openParamsIndex) : id;
}

function matchingSymbolsWithQualifier(
  id: string,
  dotIndex: number,
  transforms: Transforms,
  scope: Scope,
): [string, ElanSymbol[]] {
  let qualId = id.slice(0, dotIndex);
  const propId = id.slice(dotIndex + 1);

  const closeParamsIndex = qualId.indexOf(")");

  qualId = upToParams(qualId);

  const qual = scope.resolveSymbol(qualId, transforms, scope);

  // class scope so all or matching symbols on class
  let qualSt = qual.symbolType(transforms);

  if (isFunctionType(qualSt) && closeParamsIndex > 0) {
    qualSt = qualSt.returnType;
  }

  let classSymbols: ElanSymbol[] = [];

  if (qualSt instanceof ClassType) {
    const cls = getGlobalScope(scope).resolveSymbol(qualSt.className, transforms, scope);

    if (isClassTypeDef(cls)) {
      classSymbols = cls.symbolMatches(propId, !propId).filter((s) => isPublicMember(s));
    }
  }

  const allExtensions = getGlobalScope(scope)
    .libraryScope.symbolMatches(propId, !propId)
    .filter((s) => {
      const st = s.symbolType(transforms);
      return (
        (st instanceof ProcedureType || st instanceof FunctionType) &&
        st.isExtension &&
        isPossibleExtensionForType(qualSt, st)
      );
    });

  return [propId, classSymbols.concat(allExtensions)];
}

export function matchingSymbols(
  id: string,
  transforms: Transforms,
  scope: Scope,
): [string, ElanSymbol[]] {
  const tokens = id.split(" ");
  id = tokens.length > 0 ? tokens[tokens.length - 1].trim() : "";
  const dotIndex = id.indexOf(".");

  if (dotIndex >= 0) {
    return matchingSymbolsWithQualifier(id, dotIndex, transforms, scope);
  }

  const openParamsIndex = id.indexOf("(");
  const closeParamsIndex = id.indexOf(")");

  if (openParamsIndex >= 0 && closeParamsIndex === -1) {
    id = id.slice(openParamsIndex + 1);
  }

  const allNotExtensions = scope.symbolMatches(id, !id, scope).filter((s) => {
    const st = s.symbolType(transforms);
    let isCall = false;
    let isExtension = false;

    if (st instanceof ProcedureType || st instanceof FunctionType) {
      isCall = true;
      isExtension = st.isExtension;
    }
    return !isCall || (isCall && !isExtension);
  });

  return [id, allNotExtensions];
}

export function removeIfSingleFullMatch(symbols: ElanSymbol[], id: string): ElanSymbol[] {
  if (symbols.length === 1 && symbols[0].symbolId === id) {
    return [];
  } else {
    return symbols;
  }
}

function orderSymbol(s1: ElanSymbol, s2: ElanSymbol) {
  return s1.symbolId.localeCompare(s2.symbolId);
}

export function filteredSymbols(
  text: string,
  transforms: Transforms,
  filter: (s: ElanSymbol) => boolean,
  scope: Scope,
): [string, ElanSymbol[]] {
  const id = removeTypeSymbols(text);
  const [match, matches] = matchingSymbols(id, transforms, scope);
  const filtered = matches.filter(filter).filter((e) => !e.symbolId.startsWith("_"));

  const startsWith = filtered
    .filter((s) => s.symbolId.toUpperCase().startsWith(match.toUpperCase()))
    .sort(orderSymbol);
  const includes = filtered.filter((s) => !startsWith.includes(s)).sort(orderSymbol);
  return [match, startsWith.concat(includes)];
}

export function hasPrivateMembers(ct: ClassType) {
  const children = ct.childSymbols().filter((s) => isMember(s) && s.private);
  return children.length > 0;
}

export function getMixins(start: ClassFrame, transforms: Transforms) {
  const superClasses = start.getSuperClassesTypeAndName(transforms);
  let mixins: string[] = [];

  for (const ct of superClasses.map((t) => t[0]).filter((t) => t instanceof ClassType)) {
    if (hasPrivateMembers(ct)) {
      const name = ct.className;
      mixins.push(`_${name} = new ${name}()`);
    }
    // todo fix cast
    mixins = mixins.concat(getMixins(ct.scope as ClassFrame, transforms));
  }

  return mixins;
}

export function getAllPrivateIds(start: ClassFrame, transforms: Transforms) {
  const superClasses = start.getSuperClassesTypeAndName(transforms);
  let allNames: string[] = [];

  for (const ct of superClasses.map((t) => t[0]).filter((t) => t instanceof ClassType)) {
    const children = ct.childSymbols().filter((s) => isMember(s) && s.private);
    allNames = allNames.concat(children.map((c) => c.symbolId));
    // todo fix cast
    allNames = allNames.concat(getAllPrivateIds(ct.scope as ClassFrame, transforms));
  }

  return allNames;
}

export function updateScope(qualifier: AstQualifierNode | undefined, originalScope: Scope) {
  let currentScope = originalScope;
  const classScope = qualifier ? qualifier.symbolType() : undefined;
  if (classScope instanceof ClassType) {
    const classSymbol = originalScope.resolveSymbol(
      classScope.className,
      transforms(),
      originalScope,
    );
    // replace scope with class scope
    currentScope = isScope(classSymbol) ? classSymbol : originalScope;
  } else {
    currentScope = originalScope.getParentScope();
  }

  return currentScope;
}

function symbolMatch(id: string, symbolId: string, all: boolean) {
  if (all) {
    return true;
  }

  const uid = id.toUpperCase();
  const usid = symbolId.toUpperCase();
  return usid.startsWith(uid) || usid.includes(uid);
}

function getIds(sid: string) {
  if (sid.includes(",")) {
    return sid.split(",").map((s) => s.trim());
  }
  if (sid.includes(":")) {
    return sid.split(":").map((s) => s.trim());
  }
  return [sid];
}

function matchStart(id: string, s: ElanSymbol) {
  const sids = getIds(s.symbolId).map((s) => s.toUpperCase());
  return sids.some((sid) => sid.startsWith(id));
}

function matchIncludes(id: string, s: ElanSymbol) {
  const sids = getIds(s.symbolId).map((s) => s.toUpperCase());
  return sids.some((sid) => sid.includes(id));
}

export function symbolMatches(id: string, all: boolean, symbols: ElanSymbol[]) {
  if (all) {
    return symbols;
  }

  const uid = id.toUpperCase();
  const sw = symbols.filter((s) => matchStart(uid, s));
  let inc: ElanSymbol[] = [];
  const limit = 2; // only add includes if >= limit

  if (uid.length >= limit) {
    inc = symbols.filter((s) => !sw.includes(s)).filter((s) => matchIncludes(uid, s));
  }

  return sw.concat(inc);
}

export function removeTypeSymbols(s: string) {
  let id = s.replaceAll("[", "").replaceAll("{", "");
  const colonIndex = id.indexOf(":");

  if (colonIndex >= 0) {
    id = id.slice(colonIndex + 1);
  }

  return id;
}

export function filterForTokenType(tt: TokenType): (s?: ElanSymbol) => boolean {
  switch (tt) {
    case TokenType.none:
      return () => false;
    case TokenType.identifier:
      return isVarOrPropertyStatement;
    case TokenType.property:
      return isProperty;
    case TokenType.type:
      return isTypeName;
    case TokenType.idOrProcedure:
      return (s?: ElanSymbol) => isIdOrProcedure(s!, transforms());
    case TokenType.expression:
      return (s?: ElanSymbol) => isExpression(s!, transforms());
  }
}
