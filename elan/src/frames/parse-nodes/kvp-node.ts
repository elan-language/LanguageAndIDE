import { AbstractSequence } from "./abstract-sequence";
import { SymbolNode } from "./symbol-node";
import { ParseNode } from "./parse-node";


import { COLON } from "../symbols";
import { ParseStatus } from "../parse-status";

export class KVPnode extends AbstractSequence  {

    key: ParseNode | undefined;
    value: ParseNode | undefined;

    private keyConstructor: () => ParseNode;
    private valueConstructor: () => ParseNode;

    constructor(keyConstructor: () => ParseNode, valueConstructor: () => ParseNode) {
        super();
        this.keyConstructor = keyConstructor;
        this.valueConstructor = valueConstructor;
    }

    parseText(text: string): void {
        if (text.length > 0) {
            this.key = this.keyConstructor();
            this.value = this.valueConstructor();
            this.elements.push(this.key);
            this.elements.push(new SymbolNode(COLON));
            this.elements.push(this.value);
            super.parseText(text);
        }
    }

    getCompletionAsHtml(): string {
        var comp = "";
        comp += this.elements[0].status === ParseStatus.empty? "<pr>key</pr>": "";
        comp += this.elements[1].getCompletionAsHtml();
        comp += this.elements[2].status === ParseStatus.empty? " <pr>value</pr>": "";
        return comp;
    }
}