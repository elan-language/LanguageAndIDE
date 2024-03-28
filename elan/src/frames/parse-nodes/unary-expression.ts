import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { Term } from "./term";
import { SymbolNode } from "./symbol-node";
import { KeywordNode } from "./keyword-node";
import { notKeyword } from "../keywords";
import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";
import { isHasSymbolType } from "../../symbols/symbolHelpers";

export class UnaryExpression extends AbstractSequence {
    
    constructor(field : Field) {
        super(field);
        this.placeholder = "op";
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            var unaryOp = new Alternatives([() => new SymbolNode("-", this.field), () => new KeywordNode(notKeyword, this.field) ], this.field);
            this.elements.push(unaryOp);
            this.elements.push(new Term(this.field));
            return super.parseText(text);
        }
    }

    get symbolType() {


        if (isHasSymbolType(this.elements[1])) {
            return this.elements[1].symbolType;
        }

        return UnknownType.Instance;
    }
    
}