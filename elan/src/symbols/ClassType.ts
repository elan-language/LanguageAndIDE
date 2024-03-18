import { ISymbolType } from "./ISymbolType";

class ClassType implements ISymbolType {

    constructor(private className: string) {

    }

    get name() {
        return `Class ${this.className}`;
    }
}