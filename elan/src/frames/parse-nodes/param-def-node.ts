import { asKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { Keyword } from "./keyword";
import { TypeNode } from "./type-node";

export class ParamDefNode extends AbstractSequence {

    parseText(text: string): void {
        if (text.trim().length > 0) {
            this.elements.push(new IdentifierNode());
            this.elements.push(new Keyword(asKeyword));
            this.elements.push(new TypeNode());
            super.parseText(text);
        }
    }
}