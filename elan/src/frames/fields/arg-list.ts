import { AbstractField } from "./abstract-field";
import { Frame } from "../interfaces/frame";

export class ArgList extends AbstractField {
    getIdPrefix(): string {
        return 'args';
    }
    
    constructor(holder: Frame) {
        super(holder);
        this.setLabel("arguments");
    }
}