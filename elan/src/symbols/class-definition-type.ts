import { Scope } from "../frames/interfaces/scope";
import { ISymbol } from "./symbol";
import { ISymbolType } from "./symbol-type";

export class ClassDefinitionType implements ISymbolType, Scope {

    constructor(public className: string, public isAbstract: Boolean, scope: Scope) {

    }
    resolveSymbol(id: string, scope: Scope): ISymbol {
        return scope.resolveSymbol(id, scope);
    }

    get name() {
        return `Class ${this.className.trim()}`;
    }
}