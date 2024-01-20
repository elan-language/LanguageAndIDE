import { Statement } from "./statement";

import { Expression } from "../text-entry/expression";
import { FrameWithStatements } from "../frame-with-statements";

export class While extends FrameWithStatements implements Statement {
    htmlId: string = "";
    condition: Expression = new Expression("expression");

    constructor() {
        super();
        this.htmlId = `while${this.nextId()}`;
        this.isMultiLine = true;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>while </keyword>${this.condition.renderAsHtml()}</top>
${this.renderStatementsAsHtml()}
<keyword>end while</keyword>
</statement>`;
    }
} 
