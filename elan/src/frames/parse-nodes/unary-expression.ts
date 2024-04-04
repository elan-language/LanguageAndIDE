import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { Term } from "./term";
import { SymbolNode } from "./symbol-node";
import { KeywordNode } from "./keyword-node";
import { notKeyword } from "../keywords";

import { MINUS } from "../symbols";
import { SpaceNode } from "./space-node";
import { Space } from "./parse-node-helpers";
import { Sequence } from "./sequence";

export class UnaryExpression extends AbstractSequence {
    
    constructor() {
        super();
        this.placeholder = "op";
    }

    parseText(text: string): void {
        if (text.length > 0) {
            var minus = () => new SymbolNode(MINUS);
            var not = () => new KeywordNode(notKeyword);
            var sp = () => new SpaceNode(Space.required);
            var notSp = () => new Sequence([not, sp]);
            var unaryOp = new Alternatives([minus,notSp]);
            this.elements.push(unaryOp);
            this.elements.push(new Term());
            return super.parseText(text);
        }
    }
}