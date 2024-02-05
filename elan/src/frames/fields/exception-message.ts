import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";

//Must be a literal string or an identifier 
export class ExceptionMessage extends AbstractField {
    constructor(holder: Frame) {
        super(holder);
        this.setPrompt("message");
    }

    getPrefix(): string {
        return 'msg';
    }
}