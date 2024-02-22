import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";
import { Regexes } from "./regexes";

// Holds a literal value or variable (with optional index). This is partly used as a stop-gap pending full parsing of Expression
export class Value extends AbstractField  {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("value or expression");
    }
    regExp(): RegExp {
        return new RegExp(`^${Regexes.value}`);
    }
    getIdPrefix(): string {
        return 'expr';
    }
}