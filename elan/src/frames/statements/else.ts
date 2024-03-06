import { Parent} from "../interfaces/parent";
import { IfSelector } from "../fields/if-selector";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { singleIndent } from "../helpers";
import { Expression } from "../fields/expression";
import { MultiLineStatement } from "./multi-line-statement";

export class Else extends MultiLineStatement  {
    selectIfClause: IfSelector;
    hasIf: boolean = false;
    condition: Expression;

    constructor(parent: Parent) {
        super(parent);
        this.condition = new Expression(this);
        this.condition.setPlaceholder("condition");
        this.selectIfClause = new IfSelector(this);
    }

    getFields(): Field[] {
        return this.hasIf ? [this.condition] : [this.selectIfClause];
    }
    
    setIfExtension(to: boolean) {
        this.hasIf = to;
    }

    getIdPrefix(): string {
        return 'else';
    }
    private ifClauseAsHtml() : string {
        return this.hasIf ? `<keyword>if </keyword>${this.condition.renderAsHtml()}`: `${this.selectIfClause.renderAsHtml()}`;
    }

    private ifClauseAsSource() : string {
        return this.hasIf ? ` if ${this.condition.renderAsSource()}`:``;
    }

    private ifClauseAsObjectCode() : string {
        return this.hasIf ? ` if (${this.condition.renderAsSource()}) {`: `{`;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>else </keyword>${this.ifClauseAsHtml()}
${this.renderStatementsAsHtml()}
</statement>`;
    }

    indent(): string {
        return this.getParent()?.indent()+singleIndent(); 
    }

    renderAsSource(): string {
        return `${this.indent()}else${this.ifClauseAsSource()}\r
${this.renderStatementsAsSource()}`;
    }

    renderAsObjectCode(): string {
        return `${this.indent()}else${this.ifClauseAsObjectCode()}\r
${this.renderStatementsAsSource()}`;
    }

    parseTopOfFrame(source: CodeSource): void {
        source.remove("else");
        if (source.isMatch(" if ")) {
            this.hasIf = true;
            source.remove(" if ");
            this.condition.parseFrom(source);
        }
    }
    parseBottomOfFrame(source: CodeSource): boolean {
        var result = false;
        source.removeIndent();
        if (source.isMatch("else")) {
            result = true;
        } else  if (source.isMatch("end if")){
           result = true;
        }
        return result; 
    }
} 
