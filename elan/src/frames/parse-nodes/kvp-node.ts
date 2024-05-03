import { AbstractSequence } from "./abstract-sequence";
import { SymbolNode } from "./symbol-node";
import { ParseNode } from "./parse-node";
import { COLON } from "../symbols";
import { ParseStatus } from "../status-enums";

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
            this.addElement(this.key);
            this.addElement(new SymbolNode(COLON));
            this.addElement(this.value);
            super.parseText(text);
        }
    }

    getCompletionAsHtml(): string {
        var k =(!this.key || this.key.status === ParseStatus.empty) ? "<pr>key</pr>": "";
        var v = (!this.value || this.value.status === ParseStatus.empty) ? " <pr>value</pr>": "";
        return `${k}:${v}`;
    }
}