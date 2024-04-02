import { andKeyword, divKeyword, isKeyword, modKeyword, notKeyword, orKeyword, xorKeyword } from "../keywords";
import { AbstractAlternatives } from "./abstract-alternatives";
import { KeywordNode } from "./keyword-node";
import { SymbolNode } from "./symbol-node";
import { Sequence } from "./sequence";
import { PLUS, MINUS, MULT, DIVIDE, GT, LT, GE, LE, POWER } from "../symbols";

export class BinaryOperation extends AbstractAlternatives {
    parseText(text: string): void {  
        this.alternatives.push(new SymbolNode(PLUS));
        this.alternatives.push(new SymbolNode(MINUS));
        this.alternatives.push(new SymbolNode(MULT));
        this.alternatives.push(new SymbolNode(DIVIDE));
        this.alternatives.push(new SymbolNode(GT));
        this.alternatives.push(new SymbolNode(LT));
        this.alternatives.push(new SymbolNode(GE));
        this.alternatives.push(new SymbolNode(LE));
        this.alternatives.push(new SymbolNode(POWER));
        this.alternatives.push(new KeywordNode(isKeyword));
        var is = () => new KeywordNode(isKeyword);
        var not = () => new KeywordNode(notKeyword);
        this.alternatives.push(new Sequence([is,not]));
        this.alternatives.push(new KeywordNode(andKeyword));
        this.alternatives.push(new KeywordNode(orKeyword));
        this.alternatives.push(new KeywordNode(xorKeyword));
        this.alternatives.push(new KeywordNode(modKeyword));
        this.alternatives.push(new KeywordNode(divKeyword));;
        super.parseText(text);
    }

    renderAsSource(): string {
        return ` ${this.bestMatch?.renderAsSource()}${this.trailingSpace()}`;
    }

    renderAsHtml(): string {
        return ` ${this.bestMatch?.renderAsHtml()}${this.trailingSpace()}`;
    }

    renderAsObjectCode(): string {
        const code = super.renderAsObjectCode();

        if (this.bestMatch instanceof Sequence) {
            // kludge
            return code.replace("===!", "!==");
        }
       
        return code;
    }

    private trailingSpace(): string {
        return ("isSymbol" in this.bestMatch!) ? " " : "";
    }
}