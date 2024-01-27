import { Frame } from "../frame";
import { Text } from "./text";

export class Expression extends Text {
    getPrefix(): string {
        return 'expr';
    }
    
    constructor(parent: Frame) {
        super(parent);
        this.setPrompt("value or expression");
    }
}