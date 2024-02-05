import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";

export class Integer extends AbstractField {  
    constructor(holder: Frame) {
        super(holder);
        this.prompt = "integer";
    }

    getPrefix(): string {
        return `int`;
    }
}