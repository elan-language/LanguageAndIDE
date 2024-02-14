import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";
import { Regexes } from "./regexes";

export class Type extends AbstractField {   
    constructor(holder: Frame) {
        super(holder);
        this.useHtmlTags = true;
        this.placeholder = "Type";
    }
    getIdPrefix(): string {
        return 'type';
    }
    regExp(): RegExp {
        return new RegExp(`^${Regexes.type}`);
    }
}