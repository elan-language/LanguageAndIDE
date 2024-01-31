import { Frame } from "../frame";
import { Text } from "./text";
import {Parent} from "../parent";
import { TextFieldHolder } from "../TextFieldHolder";

export class Type extends Text {   
    constructor(holder: TextFieldHolder) {
        super(holder);
        this.useHtmlTags = true;
        this.prompt = "Type";
    }

    getPrefix(): string {
        return 'type';
    }
}