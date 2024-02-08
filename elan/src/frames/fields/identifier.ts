import { Frame } from "../interfaces/frame";
import { ParsingStatus } from "../parsing-status";
import { AbstractField } from "./abstract-field";

export class Identifier extends AbstractField {   
    constructor(holder: Frame) {
        super(holder);
        this.setLabel("name");
    }

    getIdPrefix(): string {
        return 'ident';
    }

    status(): ParsingStatus {
        if (this.text === ``) {
            return ParsingStatus.incomplete;
        } else {
            var regexp = new RegExp('^[a-z][A-Za-z0-9_]*$');
            return regexp.test(this.text)? ParsingStatus.valid : ParsingStatus.invalid;
        }
    }
}