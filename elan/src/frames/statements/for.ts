import { Statement } from "./statement";

import { Expression } from "../text-fields/expression";
import { FrameWithStatements } from "../frame-with-statements";
import { Identifier } from "../text-fields/identifier";
import { Integer } from "../text-fields/integer";

export class For extends FrameWithStatements implements Statement {
    htmlId: string = "";
    variable: Identifier = new Identifier("variableName");
    from: Expression = new Expression("integer value or expression");
    to: Expression = new Expression("integer value or expression");
    step: Integer = new Integer("");

    constructor() {
        super();
        this.htmlId = `for${this.nextId()}`;
        this.multiline = true;
        this.step.enterText("1");
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>for </keyword>${this.variable.renderAsHtml()}<keyword> from </keyword>${this.from.renderAsHtml()}<keyword> to </keyword>${this.to.renderAsHtml()}<keyword> step </keyword>${this.step.renderAsHtml()}</top>
${this.renderStatementsAsHtml()}
<keyword>end for</keyword>
</statement>`;
    }
} 
