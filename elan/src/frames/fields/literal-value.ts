import { Frame } from "../interfaces/frame";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { literalValue } from "./parse-functions";

export class LiteralValue extends AbstractField {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("value");
    }
    getHelp(): string {
        return "Literal value (e.g. number or string)";
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return literalValue(input);
    }   
}