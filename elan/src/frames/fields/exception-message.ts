import { Frame } from "../interfaces/frame";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { firstMatchFrom, identifier, literalString } from "./parse-functions";

export class ExceptionMessage extends AbstractField {
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("message");
    }
    getIdPrefix(): string {
        return 'msg';
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return firstMatchFrom(input, [literalString, identifier]);
    }
}