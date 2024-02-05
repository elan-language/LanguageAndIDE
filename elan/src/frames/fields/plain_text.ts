import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";

export class PlainText extends AbstractField {

    constructor(holder: Frame) {
        super(holder);
    }

    getPrefix(): string {
        return 'text';
    }
}