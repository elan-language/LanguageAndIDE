import { Expression } from "../fields/expression";
import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { MultiLineStatement } from "./multi-line-statement";

export class Repeat extends MultiLineStatement {
    condition: Expression;

    constructor(parent: Parent) {
        super(parent);
        this.condition = new Expression(this);
        this.condition.setPlaceholder("condition");
    }

    getFields(): Field[] {
        return [this.condition];
    }

    getIdPrefix(): string {
        return 'repeat';
    }
    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>repeat</keyword></top>
${this.renderChildrenAsHtml()}
<keyword>end repeat when </keyword>${this.condition.renderAsHtml()}
</statement>`;
    }
    renderAsSource(): string {
        return `${this.indent()}repeat\r
${this.renderChildrenAsSource()}\r
${this.indent()}end repeat when ${this.condition.renderAsSource()}`;
    }
    parseTopOfFrame(source: CodeSource): void {
        source.remove("repeat");
    }
    parseBottomOfFrame(source: CodeSource): boolean {
        var result = false;
        if (this.parseStandardEnding(source, "end repeat when ")) {
            this.condition.parseFrom(source);
            result = true;
        }
        return result;
    }
} 
