import { Statement } from "./statement";

import { Expression } from "../text-fields/expression";
import { FrameWithStatements } from "../frame-with-statements";
import { Identifier } from "../text-fields/identifier";

export class Each extends FrameWithStatements implements Statement {
    htmlId: string = "";
    variable: Identifier = new Identifier("variableName");
    iter: Expression = new Expression("iterable value or expression");

    constructor() {
        super();
        this.htmlId = `each${this.nextId()}`;
        this.isMultiLine = true;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>each </keyword>${this.variable.renderAsHtml()}<keyword> in </keyword>${this.iter.renderAsHtml()}</top>
${this.renderStatementsAsHtml()}
<keyword>end each</keyword>
</statement>`;
    }
} 
