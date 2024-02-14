import { AbstractField } from "./abstract-field";
import { Frame } from "../interfaces/frame";
import { Regexes } from "./regexes";

export class ArgList extends AbstractField {
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("arguments");
        this.setOptional(true);
    }
    regExp(): RegExp {
        return new RegExp(`^${Regexes.argList}`);
    } 
    getIdPrefix(): string {
        return 'args';
    }
    public contentAsSource() : string {
        if (this.text) {
         return this.text;
        } else {
            return "";
        }
     }
}