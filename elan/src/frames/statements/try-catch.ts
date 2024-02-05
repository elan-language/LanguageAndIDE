import { Statement } from "../interfaces/statement";
import { FrameWithStatements } from "../frame-with-statements";
import { Catch } from "./catch";
import {ParentFrame} from "../interfaces/parent-frame";
import { SelectStatement } from "../fields/select-statement";

export class TryCatch extends FrameWithStatements implements Statement {
    isStatement = true;
    
    constructor(parent: ParentFrame) {
        super(parent);
        this.multiline = true;
        this.statements.push(new Catch(this));
        this.statements.push(new SelectStatement(this));
    }

    getParentFrame(): ParentFrame {
        return this.getParent() as ParentFrame;
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
