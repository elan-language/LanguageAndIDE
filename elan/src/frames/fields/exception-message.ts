import { Frame } from "../interfaces/frame";
import { ParsingStatus } from "../parsing-status";
import { AbstractField } from "./abstract-field";

//Must be a literal string or an identifier 
export class ExceptionMessage extends AbstractField {
    constructor(holder: Frame) {
        super(holder);
        this.setPrompt("message");
    }

    getPrefix(): string {
        return 'msg';
    }

    status(): ParsingStatus { //TODO experimental/incomplete rules
        if (this.text === ``) {
            return ParsingStatus.incomplete;
        } else if (this.text.startsWith(`"`) && this.text.endsWith(`"`)) {
            return ParsingStatus.valid;
        } else if  (this.text.startsWith(`"`)) {
            return ParsingStatus.incomplete;
        } else {
            return ParsingStatus.invalid;
        }
    }
}