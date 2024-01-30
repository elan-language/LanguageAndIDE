import { Frame } from "../frame";
import { Text } from "./text";
import {Parent} from "../parent";
import { TextFieldHolder } from "../TextFieldHolder";

export class ArgList extends Text {
    getPrefix(): string {
        return 'args';
    }
    
    constructor(holder: TextFieldHolder) {
        super(holder);
        this.setPrompt("arguments");
    }
}