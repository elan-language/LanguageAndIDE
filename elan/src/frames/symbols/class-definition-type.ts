import { Class } from "../globals/class";
import { Scope } from "../interfaces/scope";
import { Transforms } from "../syntax-nodes/transforms";
import { ISymbol } from "../interfaces/symbol";
import { ISymbolType } from "../interfaces/symbol-type";
import { isSymbol } from "./symbol-helpers";
import { UnknownSymbol } from "./unknown-symbol";
import { UnknownType } from "./unknown-type";

export class ClassDefinitionType implements ISymbolType, Scope {

    constructor(public className: string, public isAbstract: boolean, private readonly scope: Class) {

    }

    childSymbols() {
        return this.scope.getChildren().filter(c => isSymbol(c)) as unknown as ISymbol[];
    }

    resolveSymbol(id: string, transforms : Transforms, scope: Scope): ISymbol {
        for (var f of this.scope.getChildren()) {
            if (isSymbol(f) && f.symbolId === id) {
                return f;
            }
        }
        return UnknownSymbol.Instance;
    }

    get name() {
        return `Class ${this.className.trim()}`;
    }
}