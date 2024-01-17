import { Text } from "./text";
import { nextId } from "../helpers";

//Must be a literal string or an identifier 
export class ExceptionMessage extends Text {
    constructor() {
        super("message");
        this.htmlId = `msg${nextId()}`;
    }

}