import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { KeywordNode } from "./keyword-node";
import { ExprNode } from "./expr-node";
import { lambdaKeyword, returnKeyword } from "../keywords";
import { ParamDefNode } from "./param-def-node";

export class Lambda extends AbstractSequence {
    constructor() {
        super();
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new KeywordNode(lambdaKeyword));
            this.elements.push(new CSV(() => new ParamDefNode(), 1));
            this.elements.push(new KeywordNode(returnKeyword));
            this.elements.push(new ExprNode());
            super.parseText(text);
        }
    }

    renderAsSource(): string {
        return `${lambdaKeyword} ${this.elements[1].renderAsSource()} ${returnKeyword} ${this.elements[3].renderAsSource()}`;
    }
}