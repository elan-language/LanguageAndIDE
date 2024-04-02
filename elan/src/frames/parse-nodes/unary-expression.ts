import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { Term } from "./term";
import { SymbolNode } from "./symbol-node";
import { KeywordNode } from "./keyword-node";
import { notKeyword } from "../keywords";
import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";

import { MINUS } from "../symbols";

export class UnaryExpression extends AbstractSequence {
    
    constructor() {
        super();
        this.placeholder = "op";
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            var unaryOp = new Alternatives([() => new SymbolNode(MINUS), () => new KeywordNode(notKeyword) ]);
            this.elements.push(unaryOp);
            this.elements.push(new Term());
            return super.parseText(text);
        }
    }
}