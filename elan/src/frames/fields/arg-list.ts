import { AbstractField } from "./abstract-field";
import { Frame } from "../interfaces/frame";
import { CodeSource } from "../code-source";

export class ArgList extends AbstractField {  
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("arguments");
        this.setOptional(true);
    }
    parse(source: CodeSource): void {
        var match = source.removeRegEx(/^[^\)]*/);
        this.text = match;
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