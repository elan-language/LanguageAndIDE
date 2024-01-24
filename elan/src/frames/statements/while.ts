import { Statement } from "./statement";
import { Expression } from "../text-fields/expression";
import { FrameWithStatements } from "../frame-with-statements";
import { Frame } from "../frame";

export class While extends FrameWithStatements implements Statement {
    htmlId: string = "";
    condition: Expression = new Expression("expression");

    constructor() {
        super();
        this.htmlId = `while${this.nextId()}`;
        this.multiline = true;
    }

    
    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent);
        this.condition.initialize(frameMap, this);
    }

    public override selectFirstText(): boolean {
        this.condition.select(true);
        return true;
    }

    isStatement = true;

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>while </keyword>${this.condition.renderAsHtml()}</top>
${this.renderStatementsAsHtml()}
<keyword>end while</keyword>
</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}while ${this.condition.renderAsSource()}\r
${this.renderStatementsAsSource()}\r
${this.indent()}end while`;
    }
} 
