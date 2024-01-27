import { Statement } from "./statement";
import { Expression } from "../text-fields/expression";
import { FrameWithStatements } from "../frame-with-statements";
import { Frame } from "../frame";

export class Repeat extends FrameWithStatements implements Statement {
    condition: Expression;

    constructor(parent: Frame) {
        super(parent);
        this.htmlId = `repeat${this.nextId()}`;
        this.multiline = true;
        this.condition = new Expression(this);
        this.condition.setPrompt("condition");
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
<top><expand>+</expand><keyword>repeat</keyword></top>
${this.renderStatementsAsHtml()}
<keyword>until </keyword>${this.condition.renderAsHtml()}
</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}repeat\r
${this.renderStatementsAsSource()}\r
${this.indent()}until ${this.condition.renderAsSource()}`;
    }
} 
