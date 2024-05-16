import { GenericSymbolType } from "../interfaces/generic-symbol-type";
import { ISymbolType } from "../interfaces/symbol-type";

export class GenericClassType implements GenericSymbolType {

    constructor(private className: string, public ofType: ISymbolType) {

    }

    get name() {
        return `Class ${this.className}<${this.ofType.name}>`;
    }
}