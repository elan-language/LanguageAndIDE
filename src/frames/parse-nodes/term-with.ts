import { AbstractSequence } from "./abstract-sequence";
import { Term } from "./term";
import { WithClause } from "./with-clause";

export class TermWith extends AbstractSequence {
  term: Term | undefined;
  with: WithClause | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = "expression";
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.term = new Term();
      this.addElement(this.term);
      this.with = new WithClause();
      this.addElement(this.with);
      return super.parseText(text);
    }
  }
}
