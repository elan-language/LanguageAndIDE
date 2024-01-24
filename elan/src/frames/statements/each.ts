import { Statement } from "./statement";
import { Expression } from "../text-fields/expression";
import { FrameWithStatements } from "../frame-with-statements";
import { Identifier } from "../text-fields/identifier";
import { Frame } from "../frame";

export class Each extends FrameWithStatements implements Statement {
    htmlId: string = "";
    variable: Identifier = new Identifier("variableName");
    iter: Expression = new Expression("iterable value or expression");

    constructor() {
        super();
        this.htmlId = `each${this.nextId()}`;
        this.multiline = true;
    }

    isStatement = true;
    
    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent);
        this.variable.initialize(frameMap, this);
        this.iter.initialize(frameMap, this);
    }

    public override selectFirstText(): boolean {
        this.variable.select();
        return true;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>each </keyword>${this.variable.renderAsHtml()}<keyword> in </keyword>${this.iter.renderAsHtml()}</top>
${this.renderStatementsAsHtml()}
<keyword>end each</keyword>
</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}each ${this.variable.renderAsSource()} in ${this.iter.renderAsSource()}\r
${this.renderStatementsAsSource()}\r
${this.indent()}end each`;
    }
} 
