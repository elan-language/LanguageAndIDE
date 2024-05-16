import { SymbolType } from "../interfaces/symbol-type";

export class ProcedureType implements SymbolType {

    constructor(public readonly parametersTypes: SymbolType[]) {

    }

    get name() {
        return `Procedure (${this.parametersTypes.map(p => p.name).join(", ")})`;
    }
}