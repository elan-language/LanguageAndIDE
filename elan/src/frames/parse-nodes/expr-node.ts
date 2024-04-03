import { Field } from "../interfaces/field";
import { AbstractAlternatives } from "./abstract-alternatives";
import { BinaryExpression } from "./binary-expression";
import { RuleNames } from "./rule-names";
import { Sequence } from "./sequence";
import { Term } from "./term";
import { WithClause } from "./with-clause";

export class ExprNode extends AbstractAlternatives {
    constructor() {
        super();
        this.placeholder = "expression";
    }

    parseText(text: string): void {
        this.alternatives.push(new Term());
        this.alternatives.push(new BinaryExpression());
        // Term with 'with' clause:
        var term = () => new Term();
        var withClause = () => new WithClause();
        this.alternatives.push(new Sequence([term, withClause], RuleNames.with));
        super.parseText(text);
    }
}