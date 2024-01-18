import { nextId } from "../helpers";
import { Statement } from "../statements/statement";
import { Expression } from "../text-entry-fields/expression";

export class Else implements Statement {
    htmlId: string = "";
    hasIf: boolean = false;
    condition: Expression = new Expression("condition");

    constructor() {
        this.htmlId = `else${nextId()}`;
    }

    private cls() : string {
        return "";
    };

    private ifClause() : string {
        return this.hasIf ? `<keyword> if </keyword>${this.condition.renderAsHtml()}<keyword> then</keyword>`:"";
    }

    renderAsHtml(): string {
        return `<clause class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>else</keyword>${this.ifClause()}</clause>`;
    }
} 
