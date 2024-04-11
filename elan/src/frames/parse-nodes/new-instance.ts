import { newKeyword } from "../keywords";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { SymbolNode } from "./symbol-node";
import { TypeWithOptGenerics } from "./type-with-opt-generics";

export class NewInstance extends AbstractSequence {
    type: TypeWithOptGenerics | undefined;
    args: CSV | undefined;

    parseText(text: string): void {
        this.elements.push(new KeywordNode(newKeyword));
        this.elements.push(new SpaceNode(Space.required));
        this.type = new TypeWithOptGenerics();
        this.elements.push(this.type);
        this.elements.push(new SymbolNode(OPEN_BRACKET)); 
        this.args = new CSV(() => new ExprNode(),0);
        this.args.setPlaceholder("arguments");
        this.elements.push(this.args); 
        this.elements.push(new SymbolNode(CLOSE_BRACKET)); 
        super.parseText(text);
    }
}