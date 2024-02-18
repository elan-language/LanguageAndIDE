import { Expression } from "../fields/expression";
import { Parent} from "../interfaces/parent";
import { AbstractFrame} from "../abstract-frame";
import { IfSelector } from "../fields/if-selector";
import { Field } from "../interfaces/field";
import { FrameWithStatements } from "../frame-with-statements";
import { CodeSource } from "../code-source";


export class Else extends FrameWithStatements  {
    isStatement = true;
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

    public override selectFirstField(): boolean {
        this.condition.select();
        return true;
    }

    private ifClauseAsHtml() : string {
        return this.hasIf ? `<keyword>if </keyword>${this.condition.renderAsHtml()}<keyword> then</keyword>`: `${this.selectIfClause.renderAsHtml()}`;
     }

    private ifClauseAsSource() : string {
        return this.hasIf ? ` if ${this.condition.renderAsSource()} then`:``;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>else </keyword>${this.ifClauseAsHtml()}</statement>`;
    }

    indent(): string {
        return this.getParent()?.indent()+""; //No additonal indent for an else clause
    }

    renderAsSource(): string {
        return `${this.indent()}else${this.ifClauseAsSource()}`;
    }

    parseTopOfFrame(source: CodeSource): void {
        source.remove("else");
        if (source.isMatch(" if ")) {
            source.remove(" if ");
            this.condition.parseFrom(source);
        }
    }
    parseBottomOfFrame(source: CodeSource): boolean {
        return source.isMatch("else") || source.isMatch("end if");
    }

} 
