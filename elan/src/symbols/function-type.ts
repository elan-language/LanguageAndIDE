import { ISymbolType } from "./symbol-type";

export class FunctionType implements ISymbolType {

    constructor(private returnType: ISymbolType, public readonly isExtension? : boolean) {

    }

    get name() {
        return `Function : ${this.returnType.name}`;
    }
}