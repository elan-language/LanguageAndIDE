import { COMMA } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { SymbolNode } from "./symbol-node";

export class CommaNode extends AbstractSequence {

    parseText(text: string): void {
        const ignoreSpace =  new SpaceNode(Space.ignored);
        const comma =  new SymbolNode(COMMA);
        const addSpace = new SpaceNode(Space.added);
        this.addElement(ignoreSpace);
        this.addElement(comma);
        this.addElement(addSpace);
        super.parseText(text);
    }
}
