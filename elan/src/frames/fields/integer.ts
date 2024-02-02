import { TextFieldHolder } from "../TextFieldHolder";
import { Field } from "./field";

export class Integer extends Field {  
    
    constructor(holder: TextFieldHolder) {
        super(holder);
        this.prompt = "integer";
    }

    getPrefix(): string {
        return `int`;
    }
}