import { ISymbolType } from "./symbol-type";

export class ProcedureType implements ISymbolType {

    constructor(public readonly parametersTypes: ISymbolType[]) {

    }

    get name() {
        return `Procedure (${this.parametersTypes.map(p => p.name).join(", ")})`;
    }
}