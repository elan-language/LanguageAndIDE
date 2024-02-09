import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";

export class Expression extends AbstractField {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("value or expression");
    }

    getIdPrefix(): string {
        return 'expr';
    }
}