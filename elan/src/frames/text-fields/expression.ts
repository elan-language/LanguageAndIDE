import { Text } from "./text";
import { TextFieldHolder } from "../TextFieldHolder";

export class Expression extends Text {   
    constructor(holder: TextFieldHolder) {
        super(holder);
        this.setPrompt("value or expression");
    }

    getPrefix(): string {
        return 'expr';
    }
}