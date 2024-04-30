import { Parent} from "../interfaces/parent";
import { IfSelector } from "../fields/if-selector";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { singleIndent } from "../helpers";
import { ExpressionField } from "../fields/expression-field";
import { FrameWithStatements } from "../frame-with-statements";
import { Statement } from "../interfaces/statement";
import { elseKeyword } from "../keywords";

export class Else extends FrameWithStatements implements Statement {
    isStatement: boolean = true;
    selectIfClause: IfSelector;
    hasIf: boolean = false;
    condition: ExpressionField;

    constructor(parent: Parent) {
        super(parent);
        this.condition = new ExpressionField(this);
        this.condition.setPlaceholder("condition");
        this.selectIfClause = new IfSelector(this);
    }

    initialKeywords(): string {
        return elseKeyword;
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
        return this.hasIf ? `if (${this.condition.compile()}) {`: `{`;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>else </keyword>${this.ifClauseAsHtml()}
${this.renderChildrenAsHtml()}
</statement>`;
    }

    indent(): string {
        return this.getParent()?.indent()+singleIndent(); 
    }

    renderAsSource(): string {
        return `${this.indent()}else${this.ifClauseAsSource()}\r
${this.renderChildrenAsSource()}`;
    }
    
    compile(): string {
        this.compileErrors = [];
        return `${this.indent()}} else ${this.ifClauseAsObjectCode()}\r
${this.renderStatementsAsObjectCode()}\r`;
    }

    parseTop(source: CodeSource): void {
        source.remove("else");
        if (source.isMatch(" if ")) {
            this.hasIf = true;
            source.remove(" if ");
            this.condition.parseFrom(source);
        }
    }
    parseBottom(source: CodeSource): boolean {
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
