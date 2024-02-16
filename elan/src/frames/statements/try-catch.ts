import { FrameWithStatements } from "../frame-with-statements";
import { Catch } from "./catch";
import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { StatementSelector } from "./statement-selector";
import { CodeSource } from "../code-source";

export class TryCatch extends FrameWithStatements  {
    isStatement = true;
    
    constructor(parent: Parent) {
        super(parent);
        this.statements.push(new Catch(this));
        this.statements.push(new StatementSelector(this));
    }

    getFields(): Field[] {
        return []; //TODO: Issue here is that Try Catch has no DirectFields.
    }
    
    getIdPrefix(): string {
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
    parseTopLine(source: CodeSource): void {
        throw new Error("Method not implemented.");
    }
    parseEndOfStatements(source: CodeSource): boolean {
        throw new Error("Method not implemented.");
    }
} 
