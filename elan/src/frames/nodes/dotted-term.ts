import { AbstractSequence } from "./abstract-sequence";
import { IndexedTerm } from "./indexed-term";
import { Multiple } from "./multiple";
import { Symbol } from "./symbol";
import { Sequence } from "./sequence";

export class DottedTerm extends AbstractSequence {
    constructor() {
        super();
    }

    parseText(text: string): void {
        var dottableTerm = () =>  new IndexedTerm();
        var dottedAddition = () => new Sequence([() => new Symbol("."), dottableTerm]);
        this.elements.push(dottableTerm());
        this.elements.push(new Multiple(dottedAddition,0)); 
        super.parseText(text);
    }

    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
}