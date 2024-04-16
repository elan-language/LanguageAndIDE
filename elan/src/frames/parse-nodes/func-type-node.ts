import { SymbolNode } from "./symbol-node";
import { ARROW, GT, LT } from "../symbols";
import { ofKeyword } from "../keywords";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { AbstractSequence } from "./abstract-sequence";
import { TypeNode } from "./type-node";
import { CSV } from "./csv";

export class FuncTypeNode extends AbstractSequence {
    inputTypes: CSV | undefined;
    returnType: TypeNode | undefined;

    constructor() {
        super();
        this.placeholder = "Type";
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.length > 0) {
            this.elements.push(new SymbolNode("Func"));
            this.elements.push(new SymbolNode(LT));
            this.elements.push(new KeywordNode(ofKeyword));
            this.elements.push(new SpaceNode(Space.required));
            this.inputTypes = new CSV(() => new TypeNode(), 0);
            this.inputTypes.setPlaceholder("Type(s)");
            this.elements.push(this.inputTypes);
            this.elements.push(new SpaceNode(Space.required));
            this.elements.push(new SymbolNode(ARROW));
            this.elements.push(new SpaceNode(Space.required));
            this.returnType = new TypeNode();
            this.elements.push(this.returnType);
            this.elements.push(new SymbolNode(GT));
            super.parseText(text.trimStart());
        }
    }
}
