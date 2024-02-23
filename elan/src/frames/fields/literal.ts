import { Frame } from "../interfaces/frame";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { literal } from "./field-parsers";

//Literal value or data structure
export class Literal extends AbstractField {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("lit");
    }
    getHelp(): string {
        return "Literal value (e.g. number or string)";
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return literal(input);
    }   
}