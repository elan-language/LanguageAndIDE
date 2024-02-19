import { Frame } from "../interfaces/frame";
import { ParsingStatus } from "../parsing-status";
import { AbstractField } from "./abstract-field";
import { Regexes } from "./regexes";

export class Expression extends AbstractField  {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("value or expression");
    }
    regExp(): RegExp {
        return new RegExp(`^${Regexes.expression}`);
    }
    getIdPrefix(): string {
        return 'expr';
    }
}