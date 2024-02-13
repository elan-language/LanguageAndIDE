import { Frame } from "../interfaces/frame";
import { ParsingStatus } from "../parsing-status";
import { AbstractField } from "./abstract-field";

export class Identifier extends AbstractField {   
    protected regx: RegExp = /^[a-z][A-Za-z0-9_]*/;

    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("name");
    }


    getIdPrefix(): string {
        return 'ident';
    }

    status(): ParsingStatus {
        if (this.text === ``) {
            return ParsingStatus.incomplete;
        } else {
            return this.regx.test(this.text)? ParsingStatus.valid : ParsingStatus.invalid;
        }
    }
}