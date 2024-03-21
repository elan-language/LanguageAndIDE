import { Frame } from "../interfaces/frame";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { anythingToNewline } from "./parse-functions";

export class Comment extends AbstractField {
    constructor(holder: Frame) {
        super(holder);
        this.setOptional(true);
        this.setPlaceholder("comment");
    }
    getIdPrefix(): string {
        return 'comment';
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return anythingToNewline(input);
    }

    parseCurrentText() : void {
        this.setStatus(ParseStatus.valid);
    }
}