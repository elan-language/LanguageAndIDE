import { Class } from "../frames/globals/class";
import { Scope } from "../frames/interfaces/scope";
import { ISymbol } from "./symbol";
import { ISymbolType } from "./symbol-type";
import { isSymbol } from "./symbolHelpers";
import { UnknownType } from "./unknown-type";

export class ClassDefinitionType implements ISymbolType, Scope {

    constructor(public className: string, public isAbstract: Boolean, private readonly scope: Class) {

    }

    childSymbols() {
        return this.scope.getChildren().filter(c => isSymbol(c)) as unknown as ISymbol[];
    }

    resolveSymbol(id: string, scope: Scope): ISymbol | undefined {
        for (var f of this.scope.getChildren()) {
            if (isSymbol(f) && f.symbolId === id) {
                return f;
            }
        }
        return undefined;
    }

    get name() {
        return `Class ${this.className.trim()}`;
    }
}