import { Frame } from "../frame";
import { Text } from "./text";

export class ParamList extends Text {
    getPrefix(): string {
        return 'params';
    }
    
    constructor(parent: Frame) {
        super(parent);
        this.setPrompt("parameter definitions");
        this.useHtmlTags = true;
    }
}