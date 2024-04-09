import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { ExprNode } from "./expr-node";
import { SymbolNode } from "./symbol-node";
import { Sequence } from "./sequence";
import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";
import { CLOSE_SQ_BRACKET, DOUBLE_DOT, OPEN_SQ_BRACKET } from "../symbols";
import { RuleNames } from "./rule-names";

export class IndexNode extends AbstractSequence {

    constructor() {
        super();
        this.placeholder = "name";
    }

    parseText(text: string): void {
        this.remainingText = text;
        var expr = () => new ExprNode();
        var symbol = () => new SymbolNode(DOUBLE_DOT);
        var rangeFrom = () => new Sequence([expr, symbol], RuleNames.rangeFrom);
        var rangeBetween = () => new Sequence([expr, symbol,expr], RuleNames.rangeBetween);
        var rangeTo = () => new Sequence([symbol,expr],  RuleNames.rangeTo);
        var range = () => new Alternatives([rangeFrom, rangeBetween, rangeTo]);
        if (text.length > 0) {
          this.elements.push(new SymbolNode(OPEN_SQ_BRACKET));
          this.elements.push(new Alternatives([expr, range]));
          this.elements.push(new SymbolNode(CLOSE_SQ_BRACKET));
          super.parseText(text);
        }
    }
}