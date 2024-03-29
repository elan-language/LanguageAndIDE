import { Frame } from "../interfaces/frame";
import { ParseByFunction as ParseByFunction } from "../interfaces/parse-by-function";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { anythingToNewline } from "./parse-functions";

export class CommentField extends AbstractField implements ParseByFunction {
    isParseByFunction = true; 

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
}