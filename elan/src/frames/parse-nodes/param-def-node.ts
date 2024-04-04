import { UnknownType } from "../../symbols/unknown-type";
import { asKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { TypeNode } from "./type-node";

export class ParamDefNode extends AbstractSequence {

    parseText(text: string): void {
        if (text.trim().length > 0) {
            this.elements.push(new IdentifierNode());
            this.elements.push(new KeywordNode(asKeyword));
            this.elements.push(new TypeNode());
            super.parseText(text);
        }
    }
    renderAsHtml(): string {
        var ident = this.elements[0].renderAsHtml();
        var type = this.elements[2].renderAsHtml();
        return `${ident}<keyword> ${asKeyword} </keyword>${type}`;
    }
    renderAsSource(): string {
        var ident = this.elements[0].renderAsSource();
        var type = this.elements[2].renderAsSource();
        return `${ident}<keyword> ${asKeyword} </keyword>${type}`;   
    }
}