import { Field } from "./field";
import { TextFieldHolder } from "../TextFieldHolder";

export class TypeList extends Field {   
    constructor(holder: TextFieldHolder) {
        super(holder);
        this.setPrompt("type(s)");
    }

    getPrefix(): string {
        return 'args';
    }
}