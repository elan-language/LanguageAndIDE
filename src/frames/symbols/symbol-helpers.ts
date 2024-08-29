import { Property } from "../class-members/property";
import { AbstractField } from "../fields/abstract-field";
import { isClass, isFile, isScope } from "../helpers";
import { AstNode } from "../interfaces/ast-node";
import { Class } from "../interfaces/class";
import { File } from "../interfaces/file";
import { Frame } from "../interfaces/frame";
import { GenericSymbolType } from "../interfaces/generic-symbol-type";
import { Parent } from "../interfaces/parent";
import { Scope } from "../interfaces/scope";
import { ElanSymbol } from "../interfaces/symbol";
import { SymbolType } from "../interfaces/symbol-type";
import { globalKeyword, libraryKeyword } from "../keywords";
import { isAstIdNode, isAstQualifiedNode } from "../syntax-nodes/ast-helpers";
import { Transforms } from "../syntax-nodes/transforms";
import { AbstractDictionaryType } from "./abstract-dictionary-type";
import { ArrayListType } from "./array-list-type";
import { BooleanType } from "./boolean-type";
import { ClassType } from "./class-type";
import { DictionaryType } from "./dictionary-type";
import { FloatType } from "./float-type";
import { FunctionType } from "./function-type";
import { GenericParameterType } from "./generic-parameter-type";
import { ImmutableDictionaryType } from "./immutable-dictionary-type";
import { ImmutableListType } from "./immutable-list-type";
import { IntType } from "./int-type";
import { IterType } from "./iter-type";
import { NullScope } from "./null-scope";
import { ProcedureType } from "./procedure-type";
import { RegExType } from "./regex-type";
import { StringType } from "./string-type";
import { SymbolScope } from "./symbol-scope";
import { UnknownType } from "./unknown-type";

export function isSymbol(s?: Parent | Frame | ElanSymbol): s is ElanSymbol {
  return !!s && "symbolId" in s && "symbolType" in s;
}

export function isGenericSymbolType(s?: SymbolType | GenericSymbolType): s is GenericSymbolType {
  return !!s && "ofType" in s;
}

export function isDictionarySymbolType(s?: SymbolType | DictionaryType): s is DictionaryType {
  return !!s && "keyType" in s && "valueType" in s;
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

export function isPropertyOnFieldsClass(s: ElanSymbol, scope: Scope) {
  return isProperty(s) && s.getParent() === getClassScope(scope);
}

export function rawSymbolToType(s: string) {
  switch (s) {
    case ">":
    case "<":
    case "<=":
    case ">=":
    case "is":
    case "isnt":
    case "and":
    case "or":
    case "xor":
      return BooleanType.Instance;
    case "div":
    case "mod":
      return IntType.Instance;
    case "/":
      return FloatType.Instance;
    case ",":
      return undefined;
    default:
      return UnknownType.Instance;
  }
}

export function scopePrefix(symbolScope: SymbolScope | undefined) {
  if (symbolScope === SymbolScope.stdlib) {
    return `_stdlib.`;
  }
  if (symbolScope === SymbolScope.property) {
    return `this.`;
  }
  return "";
}

export function updateScopeAndQualifier(
  rootNode: AstNode,
  transforms: Transforms,
  currentScope: Scope,
): [AstNode | undefined, Scope] {
  let qualifier = isAstQualifiedNode(rootNode) ? rootNode.qualifier : undefined;
  const qualifierScope = qualifier?.symbolType();
  const value = qualifier?.value;

  if (qualifierScope instanceof ClassType) {
    const classSymbol = currentScope.resolveSymbol(
      qualifierScope.className,
      transforms,
      currentScope,
    );
    // replace scope with class scope
    currentScope = isScope(classSymbol) ? classSymbol : currentScope;
  } else if (isAstIdNode(value) && value.id === globalKeyword) {
    // todo kludge
    currentScope = getGlobalScope(currentScope);
    qualifier = undefined;
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

export function getGlobalScope(start: Scope): File {
  if (start instanceof NullScope) {
    throw new Error("Global scope not found");
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

  if (isClass(start)) {
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
    type instanceof RegExType
  );
}

function matchGenericTypes(actualType: SymbolType, paramType: SymbolType) {
  if (paramType.constructor.name === actualType.constructor.name) {
    return true;
  }

  if (
    paramType instanceof IterType &&
    (actualType instanceof ImmutableListType || actualType instanceof ArrayListType)
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

  if (isDictionarySymbolType(paramType) && isDictionarySymbolType(actualType)) {
    return (
      matchDictionaryTypes(actualType, paramType) &&
      (paramType.keyType instanceof GenericParameterType ||
        matchType(actualType.keyType, paramType.keyType)) &&
      (paramType.valueType instanceof GenericParameterType ||
        matchType(actualType.valueType, paramType.valueType))
    );
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

export function isIdOrProcedure(s: ElanSymbol, transforms: Transforms) {
  return isProcedure(s, transforms) || isVarStatement(s);
}

export function isExpression(s: ElanSymbol, transforms: Transforms) {
  return !isProcedure(s, transforms);
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
    const qualId = id.slice(0, dotIndex);
    const propId = id.slice(dotIndex + 1);

    const qual = scope.resolveSymbol(qualId, transforms, scope);

    // class scope so all or matching symbols on class
    const qualSt = qual.symbolType(transforms);
    if (qualSt instanceof ClassType) {
      const cls = getGlobalScope(scope).resolveSymbol(qualSt.className, transforms, scope);

      if (isClass(cls)) {
        return [
          propId,
          cls.symbolMatches(propId, !propId).filter((s) => s.symbolScope === SymbolScope.property),
        ];
      }
      return [propId, []];
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

    return [propId, allExtensions];
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

export function filteredSymbols(
  id: string,
  transforms: Transforms,
  filter: (s: ElanSymbol) => boolean,
  scope: Scope,
): [string, ElanSymbol[]] {
  const [match, matches] = matchingSymbols(id, transforms, scope);
  const filtered = removeIfSingleFullMatch(matches.filter(filter), match);
  const ordered = filtered.sort((s1, s2) => s1.symbolId.localeCompare(s2.symbolId));
  return [match, ordered];
}
