import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { LiteralValue } from "../fields/literal-value";
import { CodeSource } from "../code-source";
import { MultiLineStatement } from "./multi-line-statement";
import { singleIndent } from "../helpers";

export class Case extends MultiLineStatement {
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

    renderAsObjectCode(): string {
        return `${this.indent()}case ${this.value.renderAsObjectCode()}:\r
${this.renderStatementsAsObjectCode()}\r
${this.indent()}${singleIndent()}break;`;
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
