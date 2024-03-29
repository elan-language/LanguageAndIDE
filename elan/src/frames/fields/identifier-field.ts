import { Frame } from "../interfaces/frame";
import { ParseByFunction } from "../interfaces/parse-by-function";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { identifier } from "./parse-functions";

export class IdentifierField extends AbstractField implements ParseByFunction {
    isParseByFunction = true;
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