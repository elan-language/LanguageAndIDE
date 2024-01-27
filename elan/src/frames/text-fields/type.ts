import { Frame } from "../frame";
import { Text } from "./text";

export class Type extends Text {
    getPrefix(): string {
        return 'type';
    }
    
    constructor(parent: Frame) {
        super(parent);
        this.useHtmlTags = true;
        this.prompt = "Type";
    }
}