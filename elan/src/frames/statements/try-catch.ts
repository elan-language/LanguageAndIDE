import { Catch } from "./catch";
import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { MultiLineStatement } from "./multi-line-statement";

export class TryCatch extends MultiLineStatement  {
    private catch: Catch;
    
    constructor(parent: Parent) {
        super(parent);
        this.catch =new Catch(this);
        this.statements.push(this.catch);
    }

    minimumNumberOfChildrenExceeded(): boolean {
        return this.getNoOfStatements() > 2; //catch +
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
    parseTopOfFrame(source: CodeSource): void {
        source.remove("try");
    }
    parseBottomOfFrame(source: CodeSource): boolean {
        var result = false;
        if (source.isMatch("catch ")) {
            result = true;
            this.catch.parseFrom(source);
        }
        return result;
    }
} 
