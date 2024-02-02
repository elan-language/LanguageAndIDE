import { Field } from "./field";
import { TextFieldHolder } from "../TextFieldHolder";

export class EnumValues extends Field {   
    constructor(holder: TextFieldHolder) {
        super(holder);
        this.setPrompt("values");
    }

    getPrefix(): string {
        return 'enumVals';
    }
}