import { BinaryOperation } from "./binary-operation";
import { AbstractSequence } from "./abstract-sequence";
import { withKeyword } from "../keywords";
import { KeywordNode } from "./keyword-node";
import { ListNode } from "./list-node";
import { SetClause } from "./set-clause";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";

export class WithClause extends AbstractSequence {
    changes: ListNode | undefined;

    parseText(text: string): void {
        var sp0 = new SpaceNode(Space.added);
        var withKw = new KeywordNode(withKeyword);
        var sp1 = new SpaceNode(Space.required);
        var setClause = () => new SetClause();
        this.changes = new ListNode(setClause);
        this.addElement(sp0);
        this.addElement(withKw);
        this.addElement(sp1);
        this.addElement(this.changes);
        return super.parseText(text);
    }

    renderAsObjectCode(): string {
        const codeArray = this.getElements().map(e => e.renderAsObjectCode());
        const code = codeArray.join(" ");
        return code;
    }

}