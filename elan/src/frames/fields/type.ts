import { Selectable } from "../selectable";
import { Field } from "./field";
import {Parent} from "../parent";
import { TextFieldHolder } from "../TextFieldHolder";

export class Type extends Field {   
    constructor(holder: TextFieldHolder) {
        super(holder);
        this.useHtmlTags = true;
        this.prompt = "Type";
    }

    getPrefix(): string {
        return 'type';
    }
}