import { Frame } from "../frame";
import { Text } from "./text";

export class Expression extends Text {   
    constructor(parent: Frame) {
        super(parent);
        this.setPrompt("value or expression");
    }

    getPrefix(): string {
        return 'expr';
    }
}