import { Regexes } from "../fields/regexes";
import { andKeyword, divKeyword, isKeyword, modKeyword, notKeyword, orKeyword, xorKeyword } from "../keywords";
import { Alternatives } from "./abstract-alternatives";
import { AbstractParseNode } from "./abstract-parse-node";
import { FixedText } from "./fixed-text";
import { Keyword } from "./keyword";
import { matchRegEx } from "./parse-node-helpers";

export class BinOp extends Alternatives {
    parseText(text: string): void {
        //TODO ? this.alternatives.push(new FixedText("**"));  
        this.alternatives.push(new FixedText("+"));
        this.alternatives.push(new FixedText("-"));
        this.alternatives.push(new FixedText("*"));
        this.alternatives.push(new FixedText("/"));
        this.alternatives.push(new FixedText(">"));
        this.alternatives.push(new FixedText("<"));
        this.alternatives.push(new FixedText(">="));
        this.alternatives.push(new FixedText("<="));
        this.alternatives.push(new Keyword(isKeyword));
        this.alternatives.push(new Keyword(isKeyword + " " + notKeyword));
        this.alternatives.push(new Keyword(andKeyword));
        this.alternatives.push(new Keyword(orKeyword));
        this.alternatives.push(new Keyword(xorKeyword));
        this.alternatives.push(new Keyword(modKeyword));
        this.alternatives.push(new Keyword(divKeyword));;
        super.parseText(text)
    }
    textAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    textAsSource(): string {
        throw new Error("Method not implemented.");
    }
}