import { Text } from "./text";
import { TextFieldHolder } from "../TextFieldHolder";

export class EnumValues extends Text {   
    constructor(holder: TextFieldHolder) {
        super(holder);
        this.setPrompt("values");
    }

    getPrefix(): string {
        return 'enumVals';
    }
}