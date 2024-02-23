import { Frame } from "../interfaces/frame";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { value } from "./field-parsers";

// Holds a literal value or variable (with optional index). This is partly used as a stop-gap pending full parsing of Expression
export class Value extends AbstractField  {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("value or expression");
    }
    getIdPrefix(): string {
        return 'expr';
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return value(input);
    }   
}