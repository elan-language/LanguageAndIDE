import { BooleanType } from "./boolean-type";
import { FloatType } from "./number-type";
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

export function isSymbol(s?: Parent | Frame | ElanSymbol): s is ElanSymbol {
  return !!s && "symbolId" in s && "symbolType" in s;
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
  }

  return [qualifier, currentScope];
}

function getGlobalScope(start: Scope): File {
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
    resolveSymbol: (
      id: string | undefined,
      transforms: Transforms,
      scope: Scope,
    ) => wrapped.resolveSymbol(id, transforms, scope),

    getParent: () => wrapped,
  } as Scope;
}
