import { AbstractField } from "./abstract-field";
import { Frame } from "../interfaces/frame";

export class ArgList extends AbstractField {  
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("arguments");
        this.setOptional(true);
    }

    getIdPrefix(): string {
        return 'args';
    }
}