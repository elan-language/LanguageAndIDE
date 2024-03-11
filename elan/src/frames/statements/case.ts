import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { LiteralValue } from "../fields/literal-value";
import { CodeSource } from "../code-source";
import { FrameWithStatements } from "../frame-with-statements";
import { Statement } from "../interfaces/statement";

export class Case extends FrameWithStatements implements Statement {
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
${this.renderChildrenAsHtml()}
</statement>`;
    }
    renderAsSource(): string {
        return `${this.indent()}case ${this.value.renderAsSource()}\r
${this.renderChildrenAsSource()}`;
    }
    parseTop(source: CodeSource): void {
        source.remove("case ");
        this.value.parseFrom(source);
    }
    parseBottom(source: CodeSource): boolean {
        source.removeIndent();
        return source.isMatch("case ") || source.isMatch("default");
    }
} 
