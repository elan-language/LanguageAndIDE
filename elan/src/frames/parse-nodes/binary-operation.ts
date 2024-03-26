import { andKeyword, divKeyword, isKeyword, modKeyword, notKeyword, orKeyword, xorKeyword } from "../keywords";
import { AbstractAlternatives } from "./abstract-alternatives";
import { KeywordNode } from "./keyword-node";
import { Symbol } from "./symbol";
import { Sequence } from "./sequence";

export class BinaryOperation extends AbstractAlternatives {
    parseText(text: string): void {
        this.alternatives.push(new Symbol("+"));
        this.alternatives.push(new Symbol("-"));
        this.alternatives.push(new Symbol("*"));
        this.alternatives.push(new Symbol("/"));
        this.alternatives.push(new Symbol(">"));
        this.alternatives.push(new Symbol("<"));
        this.alternatives.push(new Symbol(">="));
        this.alternatives.push(new Symbol("<="));
        this.alternatives.push(new KeywordNode(isKeyword));
        var is = () => new KeywordNode(isKeyword);
        var not = () => new KeywordNode(notKeyword);
        this.alternatives.push(new Sequence([is, not]));
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

    private trailingSpace(): string {
        return ("isSymbol" in this.bestMatch!) ? " " : "";
    }
}