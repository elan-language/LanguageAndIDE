import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";
import { Regexes } from "./regexes";

// (For the time being) an identifier with optional index
export class Variable extends AbstractField  {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("variable");
    }
    regExp(): RegExp {
        return new RegExp(`^${Regexes.variable}`);
    }
    getIdPrefix(): string {
        return 'val';
    }
}