import { ISymbolType } from "./symbol-type";

export class FunctionType implements ISymbolType {

    constructor(public readonly parametersTypes: ISymbolType[],
        public readonly returnType: ISymbolType,
        public readonly isExtension: boolean,
        public readonly isPure: boolean = true) {
    }

    get name() {
        return `Function (${this.parametersTypes.map(p => p.name).join(", ")}) : ${this.returnType.name}`;
    }
}