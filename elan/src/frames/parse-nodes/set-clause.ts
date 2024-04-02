import { ExprNode } from "./expr-node";
import { BinaryOperation } from "./binary-operation";
import { AbstractSequence } from "./abstract-sequence";
import { Term } from "./term";
import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";
import { FloatType } from "../../symbols/float-type";
import { IHasSymbolType } from "../../symbols/has-symbol-type";
import { withKeyword, setKeyword, toKeyword } from "../keywords";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { Sequence } from "./sequence";
import { List } from "./list";

export class SetClause extends AbstractSequence implements IHasSymbolType {
    
    constructor(field : Field) {
        super(field);
    }

    parseText(text: string): void {
        var property = new IdentifierNode(this.field);
        var set = new KeywordNode(setKeyword, this.field);
        var to = new KeywordNode(toKeyword, this.field);
        var expr = new ExprNode(this.field);
        this.elements.push(property);
        this.elements. push(set);
        this.elements. push(to);
        this.elements. push(expr);
        return super.parseText(text);
    }
    
    get symbolType() {
        const nodes = this.elements as [Term, BinaryOperation, ExprNode];
        const opType = nodes[1].symbolType;
        if (opType && opType !== UnknownType.Instance) {
            return opType;
        }

        const lhsType =  nodes[0].symbolType;
        const rhsType =  nodes[2].symbolType;

        // both int or both float
        if (lhsType?.name === rhsType?.name) {
            return lhsType;
        }
        // either was float so float
        return FloatType.Instance;
    }

    renderAsObjectCode(): string {
        const codeArray = this.elements.map(e => e.renderAsObjectCode());
        const code = codeArray.join(" ");

        // kludges
        if ((this.elements[1] as BinaryOperation).matchedText.trim() === "div"){
            return `Math.floor(${code})`;
        }

        return code;
    }

}