import { Frame } from "../frame";
import { Text } from "./text";

export class EnumValues extends Text {   
    constructor(parent: Frame) {
        super(parent);
        this.setPrompt("values");
    }

    getPrefix(): string {
        return 'enumVals';
    }
}