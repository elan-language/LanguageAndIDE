import { andKeyword, divKeyword, isKeyword, modKeyword, notKeyword, orKeyword, xorKeyword } from "../keywords";
import { AbstractAlternatives } from "./abstract-alternatives";
import { Keyword } from "./keyword";
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
        this.alternatives.push(new Keyword(isKeyword));
        var is = () => new Keyword(isKeyword);
        var not = () => new Keyword(notKeyword);
        this.alternatives.push(new Sequence([is,not]));
        this.alternatives.push(new Keyword(andKeyword));
        this.alternatives.push(new Keyword(orKeyword));
        this.alternatives.push(new Keyword(xorKeyword));
        this.alternatives.push(new Keyword(modKeyword));
        this.alternatives.push(new Keyword(divKeyword));;
        super.parseText(text);
    }
    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    renderAsSource(): string {
        var trailingSp = ("isSymbol" in this.bestMatch!) ? " " : "";
        return ` ${this.bestMatch?.renderAsSource()}${trailingSp}`;
    }
}