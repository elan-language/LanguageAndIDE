import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { ExprNode } from "./expr-node";
import { SymbolNode } from "./symbol-node";
import { Sequence } from "./sequence";
import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";

export class IndexNode extends AbstractSequence {

    constructor(field : Field) {
        super(field);
        this.placeholder = "name";
    }

    parseText(text: string): void {
        this.remainingText = text;
        var expr = () => new ExprNode(this.field);
        var symbol = () => new SymbolNode("..", this.field);
        var rangeFrom = () => new Sequence([expr, symbol], this.field);
        var rangeBetween = () => new Sequence([expr, symbol,expr], this.field);
        var rangeTo = () => new Sequence([symbol,expr], this.field);
        var range = () => new Alternatives([rangeFrom, rangeBetween, rangeTo], this.field);
        if (text.trimStart().length > 0) {
          this.elements.push(new SymbolNode("[", this.field));
          this.elements.push(new Alternatives([expr, range], this.field));
          this.elements.push(new SymbolNode("]", this.field));
          super.parseText(text);
        }
    }
    
    get symbolType() {
        return UnknownType.Instance;
    }
    
}