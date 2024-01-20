import { Statement } from "./statement";

import { FrameWithStatements } from "../frame-with-statements";
import { StatementSelector } from "./statement-selector";
import { Catch } from "../clauses/catch";

export class TryCatch extends FrameWithStatements implements Statement {
    htmlId: string = "";

    constructor() {
        super();
        this.htmlId = `try${this.nextId()}`;
        this.isMultiLine = true;
        this.addStatement(new Catch());
        this.addStatement(new StatementSelector());
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>try </keyword></top>
${this.renderStatementsAsHtml()}
<keyword>end try</keyword>
</statement>`;
    }
} 
