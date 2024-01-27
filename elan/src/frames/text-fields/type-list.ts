import { Frame } from "../frame";
import { Text } from "./text";

export class TypeList extends Text {
    getPrefix(): string {
        return 'args';
    }
    
    constructor(parent: Frame) {
        super(parent);
        this.setPrompt("type(s)");
    }
}