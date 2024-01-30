import { Text } from "./text";
import { TextFieldHolder } from "../TextFieldHolder";

export class TypeList extends Text {   
    constructor(holder: TextFieldHolder) {
        super(holder);
        this.setPrompt("type(s)");
    }

    getPrefix(): string {
        return 'args';
    }
}