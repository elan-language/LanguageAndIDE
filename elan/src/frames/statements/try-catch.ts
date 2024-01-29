import { Statement } from "./statement";
import { FrameWithStatements } from "../frame-with-statements";
import { SelectStatement } from "../text-fields/select-statement";
import { Catch } from "../clauses/catch";
import { Frame } from "../frame";

export class TryCatch extends FrameWithStatements implements Statement {
    isStatement = true;
    
    constructor(parent: Frame) {
        super(parent);
        this.multiline = true;
        this.statements.push(new Catch(this));
        this.statements.push(new SelectStatement(this));
    }
    
    getPrefix(): string {
        return 'try';
    }

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
