import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";

export class Type extends AbstractField {   
    constructor(holder: Frame) {
        super(holder);
        this.useHtmlTags = true;
        this.prompt = "Type";
    }

    getPrefix(): string {
        return 'type';
    }
}