import { Frame } from "../interfaces/frame";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { assignableValue, identifier } from "./parse-functions";

export class AssignableValue extends AbstractField { 
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("name");
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return assignableValue(input);
    }   
    getIdPrefix(): string {
        return 'ident';
    }

}