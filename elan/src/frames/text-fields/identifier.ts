import { Frame } from "../frame";
import { Text } from "./text";

export class Identifier extends Text {
    getPrefix(): string {
        return 'ident';
    }
    
    constructor(parent: Frame) {
        super(parent);
        this.setPrompt("name");
    }
}