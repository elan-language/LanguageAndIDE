import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../parse-nodes/parse-node";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { firstValidMatchOrLongestIncomplete, identifier, literalString } from "./parse-functions";

export class ExceptionMessage extends AbstractField {
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("message");
    }
    getIdPrefix(): string {
        return 'msg';
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return firstValidMatchOrLongestIncomplete(input, [literalString, identifier]);
    }
    initialiseRoot(): ParseNode | undefined { return undefined; }
    readToDelimeter: ((source: CodeSource) => string) | undefined = undefined;
}