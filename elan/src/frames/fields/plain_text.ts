import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";
import { Regexes } from "./regexes";

export class PlainText extends AbstractField {

    constructor(holder: Frame) {
        super(holder);
    }
    regExp(): RegExp {
        return new RegExp(`^${Regexes.anythingToNewLine}`);
    }
    getIdPrefix(): string {
        return 'text';
    }
}