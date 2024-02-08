import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";

export class ParamList extends AbstractField {   
    constructor(holder: Frame) {
        super(holder);
        this.setLabel("parameter definitions");
        this.useHtmlTags = true;
    }

    getIdPrefix(): string {
        return 'params';
    }
}