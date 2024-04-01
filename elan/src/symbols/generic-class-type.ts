import { ISymbolType } from "./symbol-type";

export class GenericClassType implements ISymbolType {

    constructor(private className: string, private ofType: ISymbolType) {

    }

    get name() {
        return `Class ${this.className}<${this.ofType.name}>`;
    }
}