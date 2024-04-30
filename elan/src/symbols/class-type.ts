import { ISymbolType } from "./symbol-type";

export class ClassType implements ISymbolType {

    // TODO - am I mixing up symbol types and symbols !


    constructor(public className: string, public isAbstract?: Boolean) {

    }

    get name() {
        return `Class ${this.className.trim()}`;
    }
}