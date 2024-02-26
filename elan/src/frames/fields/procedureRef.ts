import { Frame } from "../interfaces/frame";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { procedureRef } from "./parse-functions";

export class ProcedureRef extends AbstractField { 
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("name");
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return procedureRef(input);
    }   
    getIdPrefix(): string {
        return 'ident';
    }

}