import { Expression } from "../fields/expression";
import { FrameWithStatements } from "../frame-with-statements";
import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { Default } from "./default";
import { Case } from "./case";

export class Switch extends FrameWithStatements { 
    isStatement = true;
    expr: Expression;

    constructor(parent: Parent) {
        super(parent);
        this.expr = new Expression(this);
        this.statements.splice(0,1); //Removes the StatementSelector auto-added by FrameWithStatements
        this.statements.push(new Case(this));
        this.statements.push(new Default(this));
    }

    getFields(): Field[] {
        return [this.expr];
    }

    getIdPrefix(): string {
        return 'switch';
    }

    public override selectFirstField(): boolean {
        this.expr.select();
        return true;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>switch </keyword>${this.expr.renderAsHtml()}</top>
${this.renderStatementsAsHtml()}
<keyword>end switch</keyword>
</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}switch ${this.expr.renderAsSource()}\r
${this.renderStatementsAsSource()}\r
${this.indent()}end switch`;
    }
} 
