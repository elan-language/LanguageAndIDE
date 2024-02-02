import { Field } from "./field";
import { TextFieldHolder } from "../TextFieldHolder";

export class Expression extends Field {   
    constructor(holder: TextFieldHolder) {
        super(holder);
        this.setPrompt("value or expression");
    }

    getPrefix(): string {
        return 'expr';
    }
}