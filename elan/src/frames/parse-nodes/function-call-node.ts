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
import { Frame } from "../interfaces/frame";
import { RuleNames } from "./rule-names";

export class FunctionCallNode extends AbstractSequence {
    constructor() {
        super();
    }
    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            var global = () => new KeywordNode(globalKeyword);
            var lib = () => new KeywordNode(libraryKeyword);
            var variable = () => new IdentifierNode();
            var indexes = () => new Multiple(() => new IndexNode(), 0);
            var instance = () => new Sequence([variable, indexes], RuleNames.instance);
            var qualifier = () => new Alternatives([global, lib, instance]);
            var dot = () => new SymbolNode(DOT);
            var qualDot = () => new Sequence([qualifier, dot], RuleNames.qualDot);
            var optQualifier =  new OptionalNode(qualDot);

            this.elements.push(optQualifier);
            this.elements.push(new IdentifierNode());
            this.elements.push(new SymbolNode(OPEN_BRACKET));
            this.elements.push(new CSV(() => new ExprNode(),0)); //arg list
            this.elements.push(new SymbolNode(CLOSE_BRACKET));
            super.parseText(text);
        }
    }
    renderAsHtml(): string {
        return `<method>${this.elements[0].renderAsHtml()}</method>(${this.elements[2].renderAsHtml()})`;
    }

}