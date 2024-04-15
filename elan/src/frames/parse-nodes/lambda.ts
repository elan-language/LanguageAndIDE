import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { KeywordNode } from "./keyword-node";
import { ExprNode } from "./expr-node";
import { lambdaKeyword, returnKeyword } from "../keywords";
import { ParamDefNode } from "./param-def-node";
import { SymbolNode } from "./symbol-node";
import { ARROW } from "../symbols";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";

export class Lambda extends AbstractSequence {
    params: CSV | undefined;
    expr: ExprNode | undefined;

    constructor() {
        super();
    }

    parseText(text: string): void {
        if (text.length > 0) {
            this.elements.push(new KeywordNode(lambdaKeyword));
            this.params = new CSV(() => new ParamDefNode(), 1);
            this.elements.push(this.params);
            this.elements.push(new SpaceNode(Space.required));
            this.elements.push(new SymbolNode(ARROW));
            this.elements.push(new SpaceNode(Space.required));
            this.expr = new ExprNode();
            this.elements.push(this.expr);
            super.parseText(text);
        }
    }

    renderAsHtml(): string {
        return `<keyword>${lambdaKeyword} </keyword>${this.elements[1].renderAsSource()}<keyword> ${ARROW} </keyword>${this.elements[3].renderAsSource()}`;
    }

    renderAsSource(): string {
        return `${lambdaKeyword} ${this.params!.renderAsSource()} ${ARROW} ${this.expr!.renderAsSource()}`;
    }
}