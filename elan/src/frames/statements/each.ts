import { Statement } from "./statement";

import { Expression } from "../text-entry/expression";
import { FrameWithStatements } from "../frame-with-statements";
import { Identifier } from "../text-entry/identifier";

export class Each extends FrameWithStatements implements Statement {
    htmlId: string = "";
    variable: Identifier = new Identifier("variableName");
    iter: Expression = new Expression("iterable value or expression");

    constructor() {
        super();
        this.htmlId = `each${this.nextId()}`;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>each </keyword>${this.variable.renderAsHtml()}<keyword> in </keyword>${this.iter.renderAsHtml()}</top>
${this.renderStatementsAsHtml()}
<keyword>end each</keyword>
</statement>`;
    }
} 
