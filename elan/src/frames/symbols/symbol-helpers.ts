import { BooleanType } from "./boolean-type";
import { FloatType } from "./number-type";
import { ISymbol } from "../interfaces/symbol";
import { IntType } from "./int-type";
import { UnknownType } from "./unknown-type";
import { Transforms } from "../syntax-nodes/transforms";
import { Frame } from "../interfaces/frame";
import { Scope } from "../interfaces/scope";
import { globalKeyword, libraryKeyword } from "../keywords";
import { AstNode } from "../interfaces/ast-node";
import { ClassType } from "./class-type";
import { SymbolScope } from "./symbol-scope";
import { isClass, isFile, isFrame } from "../helpers";

export function isSymbol(s?: any): s is ISymbol {
    return !!s && 'symbolId' in s && 'symbolType' in s;
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

export function updateScopeAndQualifier(qualifier: any | undefined, transforms: Transforms, currentScope: Scope): [AstNode | undefined, Scope] {


    const qualifierScope = qualifier ? qualifier.symbolType() : undefined;
    const value = qualifier?.value;

    if (qualifierScope instanceof ClassType) {
        const s = currentScope.resolveSymbol(qualifierScope.className, transforms, currentScope);
        // replace scope with class scope
        currentScope = s as unknown as Scope;
    }
    else if (value?.id === globalKeyword) {
        // todo kludge
        currentScope = getGlobalScope(currentScope as Frame);
        qualifier = undefined;
    }
    else if (value?.id === libraryKeyword) {
        // todo kludge
        currentScope = (getGlobalScope(currentScope as Frame) as any).libraryScope;
        qualifier = undefined;
    }
    else if (qualifier) {
        currentScope = (getGlobalScope(currentScope as Frame) as any).libraryScope;
    }

    return [qualifier, currentScope];
}

function getGlobalScope(start: Scope): Scope {
    if (isFile(start)) {
        return start;
    }

    if (isFrame(start)) {
        return getGlobalScope(start.getParent());
    }

    return start;
}

export function getClassScope(start: Scope): Scope {
    if (isClass(start)) {
        return start;
    }

    if (isFrame(start)) {
        // todo fix any
        return getClassScope((start as any).getParent());
    }

    return start;
}

export function getParentScope(start: Scope): Scope {
    if (isFrame(start)) {
        return start.getParent();
    }
    return start;
}
