import { ISymbolType } from "./symbol-type";

export class ClassType implements ISymbolType {

    constructor(private className: string) {

    }

    get name() {
        return `Class ${this.className}`;
    }
}