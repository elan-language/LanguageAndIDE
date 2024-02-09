import { Frame } from "../interfaces/frame";
import { ParsingStatus } from "../parsing-status";
import { AbstractField } from "./abstract-field";

export class LiteralValue extends AbstractField {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("value");
    }

    getHelp(): string {
        return "Literal value (e.g. number or string)";
    }

    status(): ParsingStatus {
        if (this.text === ``) {
            return ParsingStatus.incomplete;
        } else {
            return ParsingStatus.valid;
        }
    }
}