import { Statement } from "./statement";
import { nextId } from "../helpers";
import { Expression } from "../text-entry-fields/expression";
import { FrameWithStatements } from "../frame-with-statements";

export class Repeat extends FrameWithStatements implements Statement {
    htmlId: string = "";
    condition: Expression = new Expression("expression");

    constructor() {
        super();
        this.htmlId = `while${nextId()}`;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<keyword>repeat</keyword>
${this.renderStatementsAsHtml()}
<keyword>until </keyword>${this.condition.renderAsHtml()}
</statement>`;
    }
} 
