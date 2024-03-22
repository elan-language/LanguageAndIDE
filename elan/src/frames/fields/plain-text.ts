import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../parse-nodes/parse-node";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { anythingToNewline } from "./parse-functions";

export class PlainText extends AbstractField {
    constructor(holder: Frame) {
        super(holder);
    }
    getIdPrefix(): string {
        return 'text';
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return anythingToNewline(input);
    }
    getNewRootNode(): ParseNode | undefined { return undefined; }
    readToDelimeter: ((source: CodeSource) => string) | undefined = undefined;
}