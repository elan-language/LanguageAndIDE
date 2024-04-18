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
        this.completionWhenEmpty = "Type";
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.length > 0) {
            this.addElement(new SymbolNode("Func"));
            this.addElement(new SymbolNode(LT));
            this.addElement(new KeywordNode(ofKeyword));
            this.addElement(new SpaceNode(Space.required));
            this.inputTypes = new CSV(() => new TypeNode(), 0);
            this.inputTypes.setCompletionWhenEmpty("Type(s)");
            this.addElement(this.inputTypes);
            this.addElement(new SpaceNode(Space.required));
            this.addElement(new SymbolNode(ARROW));
            this.addElement(new SpaceNode(Space.required));
            this.returnType = new TypeNode();
            this.addElement(this.returnType);
            this.addElement(new SymbolNode(GT));
            super.parseText(text.trimStart());
        }
    }
}
