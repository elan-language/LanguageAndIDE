import { AbstractField } from "./abstract-field";
import { Frame } from "../interfaces/frame";

export class ArgList extends AbstractField {
    getPrefix(): string {
        return 'args';
    }
    
    constructor(holder: Frame) {
        super(holder);
        this.setPrompt("arguments");
    }
}