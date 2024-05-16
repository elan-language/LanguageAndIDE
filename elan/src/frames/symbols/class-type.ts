import { ISymbolType } from "./symbol-type";

export class ClassType implements ISymbolType {

    constructor(public className: string) {

    }

    get name() {
        return `Class ${this.className.trim()}`;
    }
}