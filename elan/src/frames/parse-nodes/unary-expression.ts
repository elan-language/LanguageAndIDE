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
    unaryOp: Alternatives | undefined;
    term: Term |undefined;
    
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
            this.unaryOp = new Alternatives([minus,notSp]);
            this.addElement(this.unaryOp);
            this.term = new Term();
            this.addElement(this.term);
            return super.parseText(text);
        }
    }
}