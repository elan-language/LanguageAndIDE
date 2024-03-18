import { Regexes } from "../fields/regexes";
import { andKeyword, divKeyword, isKeyword, modKeyword, notKeyword, orKeyword, xorKeyword } from "../keywords";
import { AbstractAlternatives } from "./abstract-alternatives";
import { Punctuation } from "./punctuation";
import { Keyword } from "./keyword";
import { FixedTextLeadingSpace } from "./fixedTextLeadingSpace";


export class BinOp extends AbstractAlternatives {
    parseText(text: string): void {
        //TODO ? this.alternatives.push(new FixedText("**"));  
        this.alternatives.push(new FixedTextLeadingSpace("+"));
        this.alternatives.push(new FixedTextLeadingSpace("-"));
        this.alternatives.push(new FixedTextLeadingSpace("*"));
        this.alternatives.push(new FixedTextLeadingSpace("/"));
        this.alternatives.push(new FixedTextLeadingSpace(">"));
        this.alternatives.push(new FixedTextLeadingSpace("<"));
        this.alternatives.push(new FixedTextLeadingSpace(">="));
        this.alternatives.push(new FixedTextLeadingSpace("<="));
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