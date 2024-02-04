import { Selectable } from "../selectable";
import { Field } from "./field";
import {Parent} from "../parent";
import { TextFieldHolder } from "../TextFieldHolder";

export class ArgList extends Field {
    getPrefix(): string {
        return 'args';
    }
    
    constructor(holder: TextFieldHolder) {
        super(holder);
        this.setPrompt("arguments");
    }
}