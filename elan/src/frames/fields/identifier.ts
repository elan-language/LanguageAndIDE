import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ParsingStatus } from "../parsing-status";
import { AbstractField } from "./abstract-field";
import { Regexes } from "./regexes";

export class Identifier extends AbstractField { 
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("name");
    }
    regExp(): RegExp {
        return new RegExp(`^${Regexes.identifier}`);
    }
    parseFromSource(source: CodeSource): void {
        var expr = source.removeRegEx(this.regExp(), false);
        this.text = expr;
    }
    getIdPrefix(): string {
        return 'ident';
    }
}