import { Expression } from "./expression";
import { BinOp } from "./bin-op";
import { AbstractSequence } from "./abstract-sequence";
import { VariableNode } from "./variable-node";

export class BinaryOperation extends AbstractSequence {
    
    constructor() {
        super();
        this.placeholder = "op";
    }

    parseText(text: string): void {
        this.subNodes.push(new VariableNode());
        this.subNodes.push(new BinOp());
        this.subNodes.push(new Expression());
        return super.parseText(text);
    }
    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    renderAsSource(): string {
        throw new Error("Method not implemented.");
    }

}