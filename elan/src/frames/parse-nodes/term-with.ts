import { AbstractSequence } from "./abstract-sequence";
import { Term } from "./term";
import { WithClause } from "./with-clause";

export class TermWith extends AbstractSequence {
    term: Term | undefined;
    with: WithClause | undefined;
    
    constructor() {
        super();
        this.placeholder = "expression";
    }

    parseText(text: string): void {
        if (text.length > 0) {
            this.term = new Term();
            this.elements.push(this.term);
            this.with = new WithClause();
            this.elements.push(this.with);
            return super.parseText(text);
        }
    }
}