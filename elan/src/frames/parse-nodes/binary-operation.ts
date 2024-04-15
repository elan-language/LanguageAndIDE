import { andKeyword, divKeyword, isKeyword, modKeyword, notKeyword, orKeyword, xorKeyword } from "../keywords";
import { AbstractAlternatives } from "./abstract-alternatives";
import { KeywordNode } from "./keyword-node";
import { SymbolNode } from "./symbol-node";
import { Sequence } from "./sequence";
import { PLUS, MINUS, MULT, DIVIDE, GT, LT, GE, LE, POWER } from "../symbols";
import { OperatorNode } from "./operator-node";
import { SpaceNode } from "./space-node";
import { Space } from "./parse-node-helpers";

export class BinaryOperation extends AbstractAlternatives {
    parseText(text: string): void {  
        this.alternatives.push(new OperatorNode(PLUS));
        this.alternatives.push(new OperatorNode(MINUS));
        this.alternatives.push(new OperatorNode(MULT));
        this.alternatives.push(new OperatorNode(DIVIDE));
        this.alternatives.push(new OperatorNode(GT));
        this.alternatives.push(new OperatorNode(LT));
        this.alternatives.push(new OperatorNode(GE));
        this.alternatives.push(new OperatorNode(LE));
        this.alternatives.push(new OperatorNode(POWER));
        this.alternatives.push(new KeywordNode(isKeyword));
        var is = () => new KeywordNode(isKeyword);
        var sp = () => new SpaceNode(Space.required);
        var not = () => new KeywordNode(notKeyword);
        this.alternatives.push(new Sequence([is,sp, not]));
        this.alternatives.push(new KeywordNode(andKeyword));
        this.alternatives.push(new KeywordNode(orKeyword));
        this.alternatives.push(new KeywordNode(xorKeyword));
        this.alternatives.push(new KeywordNode(modKeyword));
        this.alternatives.push(new KeywordNode(divKeyword));;
        super.parseText(text.trimStart());
    }

    renderAsSource(): string {
        return `${this.bestMatch?.renderAsSource()}`;
    }

    renderAsHtml(): string {
        return `${this.bestMatch?.renderAsHtml()}`;
    }

    renderAsObjectCode(): string {
        const code = super.renderAsObjectCode();

        if (this.bestMatch instanceof Sequence) {
            // kludge
            return code.replace("=== !", "!==");
        }
       
        return code;
    }
}