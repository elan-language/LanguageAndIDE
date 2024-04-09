import { BinaryOperation } from "./binary-operation";
import { AbstractSequence } from "./abstract-sequence";
import { withKeyword } from "../keywords";
import { KeywordNode } from "./keyword-node";
import { List } from "./list";
import { SetClause } from "./set-clause";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";

export class WithClause extends AbstractSequence {
    changes: List | undefined;

    parseText(text: string): void {
        var sp0 = new SpaceNode(Space.added);
        var withKw = new KeywordNode(withKeyword);
        var sp1 = new SpaceNode(Space.required);
        var setClause = () => new SetClause();
        this.changes = new List(setClause);
        this.elements.push(sp0);
        this.elements.push(withKw);
        this.elements.push(sp1);
        this.elements. push(this.changes);
        return super.parseText(text);
    }

    renderAsObjectCode(): string {
        const codeArray = this.elements.map(e => e.renderAsObjectCode());
        const code = codeArray.join(" ");

        // kludges
        if ((this.elements[1] as BinaryOperation).matchedText.trim() === "div"){
            return `Math.floor(${code})`;
        }

        return code;
    }

}