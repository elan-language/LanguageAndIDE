import { Expression } from "../fields/expression";
import { Identifier } from "../fields/identifier";
import { Parent} from "../interfaces/parent";
import { File} from "../interfaces/file";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { MultiLineStatement } from "./multi-line-statement";

export class Each extends MultiLineStatement  {
    variable: Identifier;
    iter: Expression;

    constructor(parent: File | Parent) {
        super(parent);
        this.multiline = true;
        this.variable = new Identifier(this);
        this.variable.setPlaceholder("variableName");
        this.iter = new Expression(this);
        this.iter.setPlaceholder("iterable value or expression");
    }

    getFields(): Field[] {
        return [this.variable, this.iter];
    }

    getIdPrefix(): string {
        return 'each';
    }
    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>each </keyword>${this.variable.renderAsHtml()}<keyword> in </keyword>${this.iter.renderAsHtml()}</top>
${this.renderChildrenAsHtml()}
<keyword>end each</keyword>
</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}each ${this.variable.renderAsSource()} in ${this.iter.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
${this.indent()}end each`;
    }
    parseTop(source: CodeSource): void {
        source.remove("each ");
        this.variable.parseFrom(source);
        source.remove(" in ");
        this.iter.parseFrom(source);
    }
    parseBottom(source: CodeSource): boolean {
        return this.parseStandardEnding(source, "end each");
    }
} 
