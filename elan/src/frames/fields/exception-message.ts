import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { firstMatchFrom, identifier, literalString } from "./field-parsers";
import { Regexes } from "./regexes";

export class ExceptionMessage extends AbstractField {
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("message");
    }
    regExp(): RegExp {
        return new RegExp(`^${Regexes.literalString}|${Regexes.identifier}`);
    }
    parseFrom(source: CodeSource): void {
        var expr = source.removeRegEx(this.regExp(), false);
        this.text = expr;
    }
    getIdPrefix(): string {
        return 'msg';
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return firstMatchFrom(input, [literalString, identifier]);
    }
}