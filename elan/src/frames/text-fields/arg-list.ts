import { Frame } from "../frame";
import { Text } from "./text";

export class ArgList extends Text {
    getPrefix(): string {
        return 'args';
    }
    
    constructor(parent: Frame) {
        super(parent);
        this.setPrompt("arguments");
    }
}