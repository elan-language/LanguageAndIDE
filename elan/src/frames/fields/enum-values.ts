import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";
import { Regexes } from "./regexs";

export class EnumValues extends AbstractField {
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("values");
    }
    getIdPrefix(): string {
        return 'enumVals';
    }
    regExp(): RegExp {
        return new RegExp(`^${Regexes.identifierList}`);
    }
}