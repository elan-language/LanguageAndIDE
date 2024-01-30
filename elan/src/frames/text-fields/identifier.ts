import { Text } from "./text";
import { TextFieldHolder } from "../TextFieldHolder";

export class Identifier extends Text {
    getPrefix(): string {
        return 'ident';
    }
    
    constructor(holder: TextFieldHolder) {
        super(holder);
        this.setPrompt("name");
    }
}