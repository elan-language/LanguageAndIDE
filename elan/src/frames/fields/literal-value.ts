import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";
import { Regexes } from "./regexes";

export class LiteralValue extends AbstractField {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("value");
    }
    regExp(): RegExp {
        return new RegExp(`^${Regexes.literalValue}`);
    }

    getHelp(): string {
        return "Literal value (e.g. number or string)";
    }
}