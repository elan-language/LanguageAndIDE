import { Frame } from "../frame";
import { Text } from "./text";


//Must be a literal string or an identifier 
export class ExceptionMessage extends Text {
    getPrefix(): string {
        return 'msg';
    }
    
    constructor(parent: Frame) {
        super(parent);
        this.setPrompt("message");
    }
}