import { Frame } from "../frame";
import { Text } from "./text";


//Must be a literal string or an identifier 
export class ExceptionMessage extends Text {
    constructor(parent: Frame) {
        super(parent);
        this.setPrompt("message");
        this.htmlId = `msg${this.nextId()}`;
    }
}