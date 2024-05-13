import { ClassType } from "../../symbols/class-type";
import { SymbolScope } from "../../symbols/symbol";
import { Frame } from "../interfaces/frame";
import { Scope } from "../interfaces/scope";
import { globalKeyword, libraryKeyword } from "../keywords";
import { FixedIdAsn } from "./fixed-id-asn";
import { QualifierAsn } from "./qualifier-asn";

function getGlobalScope(start: any): Scope {
    if (start.constructor.name === "FileImpl") {
        return start;
    }
    return getGlobalScope(start.getParent());
}

export function getClassScope(start: any): Scope {
    if (start.constructor.name === "Class") {
        return start;
    }
    return getClassScope(start.getParent());
}

export function getParentScope(start: any): Scope {
    if ('getParent' in start){
         return start.getParent();
    }
    return start;
}

export function InFunctionScope(start: any): boolean {
    if (start.constructor.name === "GlobalFunction") {
        return true;
    }
    if (start.constructor.name === "FileImpl") {
        return false;
    }
    if ('getParent' in start) {
        return InFunctionScope(start.getParent());
    }
    return false;
}

export function updateScopeAndQualifier(qualifier: QualifierAsn | undefined, currentScope: Scope): [QualifierAsn | undefined, Scope] {

    const qualifierScope = qualifier ? qualifier.symbolType : undefined;
    if (qualifierScope instanceof ClassType) {
        const s = currentScope.resolveSymbol(qualifierScope.className, currentScope);
        // replace scope with class scope
        currentScope = s as unknown as Scope;
    }
    else if (qualifier?.value instanceof FixedIdAsn && qualifier.value.id === globalKeyword) {
        // todo kludge
        currentScope = getGlobalScope(currentScope as Frame);
        qualifier = undefined;
    }
    else if (qualifier?.value instanceof FixedIdAsn && qualifier.value.id === libraryKeyword) {
        // todo kludge
        currentScope = (getGlobalScope(currentScope as Frame) as any).libraryScope;
        qualifier = undefined;
    }
    else if (qualifier) {
        currentScope = (getGlobalScope(currentScope as Frame) as any).libraryScope;
    }

    return [qualifier, currentScope];
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
