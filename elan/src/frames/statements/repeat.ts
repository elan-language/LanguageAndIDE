import { Expression } from "../fields/expression";
import { FrameWithStatements } from "../frame-with-statements";
import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";

export class Repeat extends FrameWithStatements {
    isStatement = true;
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

    public override selectFirstFieldOrSuitableFrameIfNone(): boolean {
        this.condition.select();
        return true;
    }
    
    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>repeat</keyword></top>
${this.renderStatementsAsHtml()}
<keyword>end repeat when </keyword>${this.condition.renderAsHtml()}
</statement>`;
    }
    renderAsSource(): string {
        return `${this.indent()}repeat\r
${this.renderStatementsAsSource()}\r
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
