import { Statement } from "./statement";
import { nextId } from "../helpers";
import { Expression } from "../text-entry-fields/expression";
import { FrameWithStatements } from "../frame-with-statements";
import { Identifier } from "../text-entry-fields/identifier";
import { Integer } from "../text-entry-fields/integer";

export class Each extends FrameWithStatements implements Statement {
    htmlId: string = "";
    variable: Identifier = new Identifier("variableName");
    iter: Expression = new Expression("iterable value or expression");

    constructor() {
        super();
        this.htmlId = `each${nextId()}`;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<keyword>each </keyword>${this.variable.renderAsHtml()}<keyword> in </keyword>${this.iter.renderAsHtml()}
${this.renderStatementsAsHtml()}
<keyword>end each</keyword>
</statement>`;
    }
} 
