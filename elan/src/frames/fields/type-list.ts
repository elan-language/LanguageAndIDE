import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";
import { Regexes } from "./regexes";

export class TypeList extends AbstractField {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("type(s)");
    }
    regExp(): RegExp {
        return new RegExp(`^${Regexes.typeList}`);
    }
    getIdPrefix(): string {
        return 'args';
    }
}