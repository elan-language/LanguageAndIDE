import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { SymbolNode } from "./symbol-node";
import { IdentifierNode } from "./identifier-node";
import { globalKeyword, libraryKeyword } from "../keywords";
import { Alternatives } from "./alternatives";
import { KeywordNode } from "./keyword-node";
import { OptionalNode } from "./optional-node";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { QualifierDot } from "./qualifierDot";
import { InstanceNode } from "./instanceNode";

export class FunctionCallNode extends AbstractSequence {
    qualifier: OptionalNode | undefined;
    name : IdentifierNode |undefined;
    args : CSV | undefined;

    parseText(text: string): void {
        if (text.trim().length > 0) {
            var global = () => new KeywordNode(globalKeyword);
            var lib = () => new KeywordNode(libraryKeyword);
            var instance = () => new InstanceNode();;
            var qualifiers = new Alternatives([global, lib, instance]);
            var qualDot = () => new QualifierDot(qualifiers);
            this.qualifier =  new OptionalNode(qualDot);
            this.name = new IdentifierNode();
            this.args =new CSV(() => new ExprNode(),0);

            this.elements.push(this.qualifier);
            this.elements.push(this.name);
            this.elements.push(new SymbolNode(OPEN_BRACKET));
            this.elements.push(this.args); //arg list
            this.elements.push(new SymbolNode(CLOSE_BRACKET));
            super.parseText(text);
        }
    }
    renderAsHtml(): string {
        return `<method>${this.elements[0].renderAsHtml()}</method>(${this.elements[2].renderAsHtml()})`;
    }

}