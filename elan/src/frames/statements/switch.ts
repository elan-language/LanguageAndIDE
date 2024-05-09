import { ISymbol, SymbolScope } from "../../symbols/symbol";
import { CodeSource } from "../code-source";
import { ExpressionField } from "../fields/expression-field";
import { FrameWithStatements } from "../frame-with-statements";
import { Field } from "../interfaces/field";
import { Parent} from "../interfaces/parent";
import { switchKeyword } from "../keywords";
import { Default } from "./default";

export class Switch extends FrameWithStatements implements ISymbol { 
    isStatement = true;
    expr: ExpressionField;
    default: Default;

    constructor(parent: Parent) {
        super(parent);
        this.expr = new ExpressionField(this);
        this.default = new Default(this);
        this.getChildren().push(this.default);
    }

    get symbolId() {
        return "_";
    }

    get symbolType() {
        return this.expr.symbolType;
    }

    symbolScope = SymbolScope.local;

    initialKeywords(): string {
        return switchKeyword;
    }
    minimumNumberOfChildrenExceeded(): boolean {
        return this.getChildren().length > 2; //default +
    }

    getFields(): Field[] {
        return [this.expr];
    }

    getIdPrefix(): string {
        return 'switch';
    }
    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>switch </keyword>${this.expr.renderAsHtml()}</top>${this.compileMsgAsHtml()}
${this.renderChildrenAsHtml()}
<keyword>end switch</keyword>
</statement>`;
    }
    renderAsSource(): string {
        return `${this.indent()}switch ${this.expr.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
${this.indent()}end switch`;
    }

    compile(): string {
        this.compileErrors = [];
        return `${this.indent()}switch (${this.expr.compile()}) {\r
${this.renderStatementsAsObjectCode()}\r
${this.indent()}}`;
    }
    
    parseTop(source: CodeSource): void {
        source.remove("switch ");
        this.expr.parseFrom(source);
    }
    parseBottom(source: CodeSource): boolean {
        var result = false;
        if (source.isMatch("default")) {
            result = true;
            this.default.parseFrom(source);
            source.remove("end switch");
        };
        return result;
    }
} 
