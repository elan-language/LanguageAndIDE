import { Frame } from "../interfaces/frame";
import { ParsingStatus } from "../parsing-status";
import { AbstractField } from "./abstract-field";

export class Integer extends AbstractField {  
    constructor(holder: Frame) {
        super(holder);
        this.prompt = "integer";
    }

    getPrefix(): string {
        return `int`;
    }

    status(): ParsingStatus {
        if (this.text === ``) {
            return ParsingStatus.incomplete;
        } else {
            var regexp = new RegExp('^[1-9][0-9]*$');
            return regexp.test(this.text)? ParsingStatus.valid : ParsingStatus.invalid;
        }
    }
}