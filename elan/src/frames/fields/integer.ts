import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";
import { Regexes } from "./regexes";

export class Integer extends AbstractField {  
    constructor(holder: Frame) {
        super(holder);
        this.placeholder = "integer";
    }

    getIdPrefix(): string {
        return `int`;
    }
    regExp(): RegExp {
        return new RegExp(`^${Regexes.literalInt}`);
    }
    parseFrom(source: CodeSource): void {
        var expr = source.removeRegEx(this.regExp(), false);
        this.text = expr;
    }
}