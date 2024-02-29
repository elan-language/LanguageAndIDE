import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { LiteralValue } from "../fields/literal-value";
import { FrameWithStatements } from "../frame-with-statements";
import { CodeSource } from "../code-source";
import { AbstractSelector } from "../abstract-selector";
import { StatementSelector } from "./statement-selector";

export class Case extends FrameWithStatements{
    isStatement = true;
    value: LiteralValue;

    constructor(parent: Parent) {
        super(parent);
        this.value  = new LiteralValue(this);
    }
    
    getFields(): Field[] {
        return [this.value];
    }
    
    getIdPrefix(): string {
        return 'case';
    }
    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>case </keyword>${this.value.renderAsHtml()}</top>
${this.renderStatementsAsHtml()}
</statement>`;
    }
    renderAsSource(): string {
        return `${this.indent()}case ${this.value.renderAsSource()}\r
${this.renderStatementsAsSource()}`;
    }
    parseTopOfFrame(source: CodeSource): void {
        source.remove("case ");
        this.value.parseFrom(source);
    }
    parseBottomOfFrame(source: CodeSource): boolean {
        source.removeIndent();
        return source.isMatch("case ") || source.isMatch("default");
    }
} 
