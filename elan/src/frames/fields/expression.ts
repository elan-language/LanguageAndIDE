import { Frame } from "../interfaces/frame";
import { ExprNode } from "../nodes/expr-node";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { anythingToNewline } from "./parse-functions";

export class Expression extends AbstractField  {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("value or expression");
    }
    getIdPrefix(): string {
        return 'expr';
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return anythingToNewline(input);
    }   

    parseCurrentText() : void {
        var status = ParseStatus.invalid;
        var node = new ExprNode();
        node.parseText(this.text);
        if (node.remainingText.trim().length === 0) { //i.e. valid or incomplete
            status = node.status;
        }
        this.setStatus(status);
    }
}
