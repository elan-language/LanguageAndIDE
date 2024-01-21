import { Statement } from "./statement";

import { Expression } from "../text-fields/expression";
import { FrameWithStatements } from "../frame-with-statements";

export class Repeat extends FrameWithStatements implements Statement {
    htmlId: string = "";
    condition: Expression = new Expression("expression");

    constructor() {
        super();
        this.htmlId = `repeat${this.nextId()}`;
        this.isMultiLine = true;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>repeat</keyword></top>
${this.renderStatementsAsHtml()}
<keyword>until </keyword>${this.condition.renderAsHtml()}
</statement>`;
    }
} 
