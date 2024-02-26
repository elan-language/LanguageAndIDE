import { Frame } from "../interfaces/frame";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { variable } from "./parse-functions";

// (For the time being) an identifier with optional index
export class Variable extends AbstractField  {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("variable");
    }
    getIdPrefix(): string {
        return 'val';
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return variable(input);
    }   
}