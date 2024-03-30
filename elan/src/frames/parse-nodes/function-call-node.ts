import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { SymbolNode } from "./symbol-node";
import { IdentifierNode } from "./identifier-node";
import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";
import { propertyKeyword, globalKeyword, libraryKeyword } from "../keywords";
import { Alternatives } from "./alternatives";
import { KeywordNode } from "./keyword-node";
import { OptionalNode } from "./optional-node";
import { Sequence } from "./sequence";
import { IndexNode } from "./index-node";
import { Multiple } from "./multiple";
import { CLOSE_BRACKET, DOT, OPEN_BRACKET } from "../symbols";

export class FunctionCallNode extends AbstractSequence {
    constructor(field : Field) {
        super(field);
    }
    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            var global = () => new KeywordNode(globalKeyword, this.field);
            var lib = () => new KeywordNode(libraryKeyword, this.field);
            var variable = () => new IdentifierNode(this.field);
            var indexes = () => new Multiple(() => new IndexNode(this.field), 0,this.field);
            var instance = () => new Sequence([variable, indexes],this.field);
            var qualifier = () => new Alternatives([global, lib, instance], this.field);
            var dot = () => new SymbolNode(DOT, this.field);
            var qualDot = () => new Sequence([qualifier, dot], this.field);
            var optQualifier =  new OptionalNode(qualDot, this.field);

            this.elements.push(optQualifier);
            this.elements.push(new IdentifierNode(this.field));
            this.elements.push(new SymbolNode(OPEN_BRACKET,this.field));
            this.elements.push(new CSV(() => new ExprNode(this.field),0,this.field)); //arg list
            this.elements.push(new SymbolNode(CLOSE_BRACKET,this.field));
            super.parseText(text);
        }
    }
    renderAsHtml(): string {
        return `<method>${this.elements[0].renderAsHtml()}</method>(${this.elements[2].renderAsHtml()})`;
    }
    
    get symbolType() {
        return UnknownType.Instance;
    }
}