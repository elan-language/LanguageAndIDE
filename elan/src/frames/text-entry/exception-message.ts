import { Text } from "./text";


//Must be a literal string or an identifier 
export class ExceptionMessage extends Text {
    constructor() {
        super("message");
        this.htmlId = `msg${this.nextId()}`;
    }

}