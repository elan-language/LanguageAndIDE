import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";

export class TypeList extends AbstractField {   
    constructor(holder: Frame) {
        super(holder);
        this.setPrompt("type(s)");
    }

    getPrefix(): string {
        return 'args';
    }
}