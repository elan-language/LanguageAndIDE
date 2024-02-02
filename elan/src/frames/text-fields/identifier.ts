import { Field } from "./field";
import { TextFieldHolder } from "../TextFieldHolder";

export class Identifier extends Field {
    getPrefix(): string {
        return 'ident';
    }
    
    constructor(holder: TextFieldHolder) {
        super(holder);
        this.setPrompt("name");
    }
}