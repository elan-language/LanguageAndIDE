import { BooleanType } from "./boolean-type";
import { FloatType } from "./float-type";
import { ElanSymbol } from "../interfaces/symbol";
import { IntType } from "./int-type";
import { UnknownType } from "./unknown-type";
import { Transforms } from "../syntax-nodes/transforms";
import { Scope } from "../interfaces/scope";
import { globalKeyword, libraryKeyword } from "../keywords";
import { AstNode } from "../interfaces/ast-node";
import { SymbolScope } from "./symbol-scope";
import { isClass as isClass, isFile, isFrame, isScope } from "../helpers";
import { File } from "../interfaces/file";
import { AstQualifierNode } from "../interfaces/ast-qualifier-node";
import { Frame } from "../interfaces/frame";
import { Parent } from "../interfaces/parent";
import { ClassType } from "./class-type";
import { SymbolType } from "../interfaces/symbol-type";
import { StringType } from "./string-type";
import { GenericSymbolType } from "../interfaces/generic-symbol-type";
import { DictionaryType } from "./dictionary-type";
import { VarStatement } from "../statements/var-statement";
import { transforms } from "../syntax-nodes/ast-helpers";
import { GenericParameterType } from "./generic-parameter-type";
import { ProcedureType } from "./procedure-type";

export function isSymbol(s?: Parent | Frame | ElanSymbol): s is ElanSymbol {
  return !!s && "symbolId" in s && "symbolType" in s;
}

export function isGenericSymbolType(s?: SymbolType | GenericSymbolType): s is GenericSymbolType {
  return !!s && "ofType" in s;
}

export function isDictionarySymbolType(s?: SymbolType | DictionaryType): s is DictionaryType {
  return !!s && "keyType" in s && "valueType" in s;
}

export function rawSymbolToType(s: string) {
  switch (s) {
    case ">":
    case "<":
    case "<=":
    case ">=":
    case "is":
    case "is not":
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
  qualifier: AstQualifierNode | undefined,
  transforms: Transforms,
  currentScope: Scope,
): [AstNode | undefined, Scope] {
  const qualifierScope = qualifier ? qualifier.symbolType() : undefined;
  const value = qualifier?.value;

  if (qualifierScope instanceof ClassType) {
    const classSymbol = currentScope.resolveSymbol(
      qualifierScope.className,
      transforms,
      currentScope,
    );
    // replace scope with class scope
    currentScope = isScope(classSymbol) ? classSymbol : currentScope;
  } else if (value?.id === globalKeyword) {
    // todo kludge
    currentScope = getGlobalScope(currentScope);
    qualifier = undefined;
  } else if (value?.id === libraryKeyword) {
    currentScope = getGlobalScope(currentScope).libraryScope;
    qualifier = undefined;
  } else if (qualifier) {
    currentScope = getGlobalScope(currentScope).libraryScope;
  } else {
    currentScope = getParentScope(currentScope);
  }

  return [qualifier, currentScope];
}

export function getGlobalScope(start: Scope): File {
  if (isFile(start)) {
    return start;
  }

  if (isScope(start)) {
    return getGlobalScope(start.getParent());
  }

  throw new Error("Global scope not found");
}

export function getClassScope(start: Scope): Scope {
  if (isClass(start)) {
    return start;
  }

  if (isScope(start)) {
    return getClassScope(start.getParent());
  }

  return start;
}

export function getParentScope(start: Scope): Scope {
  if (isScope(start)) {
    return start.getParent();
  }
  return start;
}

export function wrapScopeInScope(wrapped: Scope) {
  return {
    resolveSymbol: (id: string | undefined, transforms: Transforms, scope: Scope) =>
      wrapped.resolveSymbol(id, transforms, scope),

    getParent: () => wrapped,
  } as Scope;
}

export function isValueType(type: SymbolType) {
  return (
    type instanceof IntType ||
    type instanceof FloatType ||
    type instanceof BooleanType ||
    type instanceof StringType
  );
}

export function isPossibleExtensionForType(parmType: SymbolType, proc: ProcedureType) {
  if (proc.parametersTypes.length > 0) {
    const firstParmType = proc.parametersTypes[0];

    if (firstParmType.name === parmType.name) {
      return true;
    }

    if (firstParmType instanceof GenericParameterType) {
      return true;
    }

    if (isGenericSymbolType(firstParmType) && isGenericSymbolType(parmType)) {
      return (
        firstParmType.constructor.name === parmType.constructor.name &&
        (firstParmType.ofType instanceof GenericParameterType ||
          firstParmType.ofType.name === parmType.ofType.name)
      );
    }

    if (isDictionarySymbolType(firstParmType) && isDictionarySymbolType(parmType)) {
      return (
        firstParmType.constructor.name === parmType.constructor.name &&
        (firstParmType.keyType instanceof GenericParameterType ||
          firstParmType.keyType.name === parmType.keyType.name) &&
        (firstParmType.valueType instanceof GenericParameterType ||
          firstParmType.valueType.name === parmType.valueType.name)
      );
    }
  }

  return false;
}

export function isIdOrProcedure(s: ElanSymbol) {
  return s instanceof VarStatement || s.symbolType(transforms()) instanceof ProcedureType;
}

export function matchingSymbols(id: string, scope: Scope): ElanSymbol[] {
  const dotIndex = id.indexOf(".");

  if (dotIndex >= 0) {
    const qualId = id.slice(0, dotIndex);
    const propId = id.slice(dotIndex + 1);

    const qual = scope.resolveSymbol(qualId, transforms(), scope);

    // class scope so all or matching symbols on class
    const qualSt = qual.symbolType(transforms());
    if (qualSt instanceof ClassType) {
      const cls = getGlobalScope(scope).resolveSymbol(qualSt.className, transforms(), scope);

      if (isClass(cls as unknown as Scope)) {
        return (cls as unknown as Scope)
          .symbolMatches(propId, !propId)
          .filter((s) => s.symbolScope === SymbolScope.property)
          .filter((s) => s.symbolType(transforms()) instanceof ProcedureType);
      }
      return [];
    }

    const allExtensions = getGlobalScope(scope)
      .libraryScope.symbolMatches(propId, !propId)
      .filter((s) => {
        const st = s.symbolType(transforms());
        return (
          st instanceof ProcedureType && st.isExtension && isPossibleExtensionForType(qualSt, st)
        );
      });

    return allExtensions;
  }

  return scope.symbolMatches(id, false, scope as Frame);
}
