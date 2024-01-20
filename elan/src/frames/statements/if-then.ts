import { Statement } from "./statement";

import { Expression } from "../text-entry/expression";
import { FrameWithStatements } from "../frame-with-statements";

export class IfThen extends FrameWithStatements implements Statement {
    htmlId: string = "";
    condition: Expression = new Expression("iterable value or expression");

    constructor() {
        super();
        this.htmlId = `if${this.nextId()}`;
        this.isMultiLine = true;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>if </keyword>${this.condition.renderAsHtml()}<keyword> then </keyword></top>
${this.renderStatementsAsHtml()}
<keyword>end if</keyword>
</statement>`;
    }
} 
