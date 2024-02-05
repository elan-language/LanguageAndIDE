import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";

export class Identifier extends AbstractField {
    getPrefix(): string {
        return 'ident';
    }
    
    constructor(holder: Frame) {
        super(holder);
        this.setPrompt("name");
    }
}