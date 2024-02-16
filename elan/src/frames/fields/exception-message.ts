import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ParsingStatus } from "../parsing-status";
import { AbstractField } from "./abstract-field";
import { Regexes } from "./regexes";

//Must be a literal string or an identifier 
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
}