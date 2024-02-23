import { Frame } from "../interfaces/frame";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { identifier } from "./field-parsers";

export class Identifier extends AbstractField { 
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("name");
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return identifier(input);
    }   
    getIdPrefix(): string {
        return 'ident';
    }

}