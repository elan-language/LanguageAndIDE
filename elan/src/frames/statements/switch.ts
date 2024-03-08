import { CodeSource } from "../code-source";
import { Expression } from "../fields/expression";
import { Field } from "../interfaces/field";
import { Parent} from "../interfaces/parent";
import { Default } from "./default";
import { MultiLineStatement } from "./multi-line-statement";

export class Switch extends MultiLineStatement { 
    isStatement = true;
    expr: Expression;
    default: Default;

    constructor(parent: Parent) {
        super(parent);
        this.expr = new Expression(this);
        this.default = new Default(this);
        this.getChildren().push(this.default);
    }

    minimumNumberOfChildrenExceeded(): boolean {
        return this.getNoOfStatements() > 2; //default +
    }

    getFields(): Field[] {
        return [this.expr];
    }

    getIdPrefix(): string {
        return 'switch';
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
    parseTopOfFrame(source: CodeSource): void {
        source.remove("switch ");
        this.expr.parseFrom(source);
    }
    parseBottomOfFrame(source: CodeSource): boolean {
        var result = false;
        if (source.isMatch("default")) {
            result = true;
            this.default.parseFrom(source);
            source.remove("end switch");
        };
        return result;
    }
} 
