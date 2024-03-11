import { Alternatives } from "./abstract-alternatives";
import { BinaryOperation } from "./binary-operation";
import { VariableNode } from "./variable-node";


//TODO: factor out the general capability of SequenceParseNode
export class Expression extends Alternatives {
    constructor() {
        super();
        this.placeholder = "expression";
    }

    parseText(text: string): void {
        //Sub nodes added only when asked to parse
        this.alternatives.push(new VariableNode());
        this.alternatives.push(new BinaryOperation());
        super.parseText(text);
    }
    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    renderAsSource(): string {
        throw new Error("Method not implemented.");
    }
    
}