import { andKeyword, divKeyword, isKeyword, modKeyword, notKeyword, orKeyword, xorKeyword } from "../keywords";
import { AbstractAlternatives } from "./abstract-alternatives";
import { Keyword } from "./keyword";
import { Punctuation } from "./punctuation";


export class BinOp extends AbstractAlternatives {
    parseText(text: string): void {
        //TODO ? this.alternatives.push(new FixedText("**"));  
        this.alternatives.push(new Punctuation("+"));
        this.alternatives.push(new Punctuation("-"));
        this.alternatives.push(new Punctuation("*"));
        this.alternatives.push(new Punctuation("/"));
        this.alternatives.push(new Punctuation(">"));
        this.alternatives.push(new Punctuation("<"));
        this.alternatives.push(new Punctuation(">="));
        this.alternatives.push(new Punctuation("<="));
        this.alternatives.push(new Keyword(isKeyword));
        this.alternatives.push(new Keyword(isKeyword + " " + notKeyword));
        this.alternatives.push(new Keyword(andKeyword));
        this.alternatives.push(new Keyword(orKeyword));
        this.alternatives.push(new Keyword(xorKeyword));
        this.alternatives.push(new Keyword(modKeyword));
        this.alternatives.push(new Keyword(divKeyword));;
        super.parseText(text)
    }
    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
}