import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";

export class ParamList extends AbstractField {   
    constructor(holder: Frame) {
        super(holder);
        this.setPrompt("parameter definitions");
        this.useHtmlTags = true;
    }

    getPrefix(): string {
        return 'params';
    }
}