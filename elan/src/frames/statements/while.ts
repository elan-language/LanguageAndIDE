import { Statement } from "./statement";
import { nextId } from "../helpers";
import { Expression } from "../text-entry/expression";
import { FrameWithStatements } from "../frame-with-statements";

export class While extends FrameWithStatements implements Statement {
    htmlId: string = "";
    condition: Expression = new Expression("expression");

    constructor() {
        super();
        this.htmlId = `while${nextId()}`;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<keyword>while </keyword>${this.condition.renderAsHtml()}
${this.renderStatementsAsHtml()}
<keyword>end while</keyword>
</statement>`;
    }
} 
