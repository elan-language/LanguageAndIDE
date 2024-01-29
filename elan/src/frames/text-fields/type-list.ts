import { Frame } from "../frame";
import { Text } from "./text";

export class TypeList extends Text {   
    constructor(parent: Frame) {
        super(parent);
        this.setPrompt("type(s)");
    }

    getPrefix(): string {
        return 'args';
    }
}