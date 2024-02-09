import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";

export class TypeList extends AbstractField {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("type(s)");
    }

    getIdPrefix(): string {
        return 'args';
    }
}