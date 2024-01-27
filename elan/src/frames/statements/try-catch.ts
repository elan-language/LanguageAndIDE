import { Statement } from "./statement";
import { FrameWithStatements } from "../frame-with-statements";
import { StatementSelector } from "./statement-selector";
import { Catch } from "../clauses/catch";
import { Frame } from "../frame";

export class TryCatch extends FrameWithStatements implements Statement {

    constructor(parent: Frame) {
        super(parent);
        this.htmlId = `try${this.nextId()}`;
        this.multiline = true;
    }
    
    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent);
        this.addStatement(new Catch(this.getParent()));
        this.addStatement(new StatementSelector(this.getParent()));
    }

    isStatement = true;

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>try </keyword></top>
${this.renderStatementsAsHtml()}
<keyword>end try</keyword>
</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}try\r
${this.renderStatementsAsSource()}\r
${this.indent()}end try`;
    }
} 
