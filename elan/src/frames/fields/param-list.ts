import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";
import { Regexes } from "./regexs";

export class ParamList extends AbstractField {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("parameter definitions");
        this.useHtmlTags = true;
        this.setOptional(true);
    }
    regExp(): RegExp {
        return new RegExp(`^${Regexes.paramList}`);
    }
    getIdPrefix(): string {
        return 'params';
    }
}