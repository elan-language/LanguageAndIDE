import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../parse-nodes/parse-node";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { anythingToNewline } from "./parse-functions";

export class CommentField extends AbstractField {

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

    initialiseRoot(): ParseNode | undefined {return undefined; }
    readToDelimeter: ((source: CodeSource) => string) | undefined;
}