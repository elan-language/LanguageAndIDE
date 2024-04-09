import { asKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { TypeNode } from "./type-node";

export class ParamDefNode extends AbstractSequence {

    name: IdentifierNode | undefined;
    type: TypeNode | undefined;

    parseText(text: string): void {
        if (text.trim().length > 0) {
            this.name = new IdentifierNode();
            this.elements.push(this.name);
            this.elements.push(new SpaceNode(Space.required));
            this.elements.push(new KeywordNode(asKeyword));
            this.elements.push(new SpaceNode(Space.required));
            this.type = new TypeNode()
            this.elements.push(this.type);
            super.parseText(text);
        }
    }
    renderAsHtml(): string {
        //Not safe - method may be called before there are any elements set up
        if(this.matchedText.length > 0) {
            var ident = this.elements[0].renderAsHtml();
            var type = this.elements[4].renderAsHtml();
            return `${ident}<keyword> ${asKeyword} </keyword>${type}`;
        }else {
            return super.renderAsHtml();
        }
    }
    renderAsSource(): string {
        var ident = this.elements[0].renderAsSource();
        var type = this.elements[4].renderAsSource();
        return `${ident} ${asKeyword} ${type}`;   
    }
}