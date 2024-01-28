import { Frame } from "../frame";
import { Text } from "./text";

export class Type extends Text {   
    constructor(parent: Frame) {
        super(parent);
        this.useHtmlTags = true;
        this.prompt = "Type";
    }

    getPrefix(): string {
        return 'type';
    }
}