import { Field } from "./field";
import { TextFieldHolder } from "../TextFieldHolder";

export class ParamList extends Field {   
    constructor(holder: TextFieldHolder) {
        super(holder);
        this.setPrompt("parameter definitions");
        this.useHtmlTags = true;
    }

    getPrefix(): string {
        return 'params';
    }
}