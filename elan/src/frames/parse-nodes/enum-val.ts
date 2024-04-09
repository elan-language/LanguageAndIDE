import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { SymbolNode } from "./symbol-node";
import { TypeSimpleNode } from "./type-simple-node";
import { DOT } from "../symbols";

export class EnumVal extends AbstractSequence {
    type: TypeSimpleNode | undefined;
    val: IdentifierNode | undefined;

    parseText(text: string): void {
        this.type = new TypeSimpleNode();
        this.elements.push(this.type);
        this.elements.push(new SymbolNode(DOT));
        this.val = new IdentifierNode();
        this.elements.push(this.val);
        super.parseText(text);
    }
}