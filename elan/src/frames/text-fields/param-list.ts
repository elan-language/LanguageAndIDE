import { Text } from "./text";
import { TextFieldHolder } from "../TextFieldHolder";

export class ParamList extends Text {   
    constructor(holder: TextFieldHolder) {
        super(holder);
        this.setPrompt("parameter definitions");
        this.useHtmlTags = true;
    }

    getPrefix(): string {
        return 'params';
    }
}