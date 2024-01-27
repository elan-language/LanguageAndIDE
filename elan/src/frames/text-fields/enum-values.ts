import { Frame } from "../frame";
import { Text } from "./text";

export class EnumValues extends Text {
    getPrefix(): string {
        return 'enumVals';
    }
    
    constructor(parent: Frame) {
        super(parent);
        this.setPrompt("values");
    }
}