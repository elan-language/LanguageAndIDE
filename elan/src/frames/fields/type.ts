import { Frame } from "../interfaces/frame";
import { ParsingStatus } from "../parsing-status";
import { AbstractField } from "./abstract-field";

export class Type extends AbstractField {   
    constructor(holder: Frame) {
        super(holder);
        this.useHtmlTags = true;
        this.placeholder = "Type";
    }

    getIdPrefix(): string {
        return 'type';
    }

    status(): ParsingStatus {
        if (this.text === ``) {
            return ParsingStatus.incomplete;
        } else {
            //var regexp = new RegExp('^[A-Z][A-Za-z0-9_]*$');
            var regexp = new RegExp('^[A-Z].*$');
            return regexp.test(this.text)? ParsingStatus.valid : ParsingStatus.invalid;            
        }
    }
}