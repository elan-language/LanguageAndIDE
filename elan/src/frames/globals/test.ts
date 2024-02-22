import { CodeSource } from "../code-source";
import { Identifier } from "../fields/identifier";
import { FrameWithStatements } from "../frame-with-statements";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";

export class Test extends FrameWithStatements {
    isTest = true;
    isGlobal = true;
    public name : Identifier;

    constructor(parent: Parent) {
        super(parent);
        this.multiline = true;
        this.name = new Identifier(this);
    }

    getFields(): Field[] {
        return [this.name];
    }

    getIdPrefix(): string {
        return 'test';
    }

    public override selectFirstField(): boolean {
        this.name.select();
        return true;
    }

    public renderAsHtml() : string {
        return `<procedure class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>test </keyword>${this.name.renderAsHtml()}</top>
${this.renderStatementsAsHtml()}
<keyword>end test</keyword>
</procedure>`;
    }
    indent(): string {
        return "";
    }
    public renderAsSource() : string {
        return `test ${this.name.renderAsSource()}\r
${this.renderStatementsAsSource()}\r
end test\r
`;
    }
    parseTopOfFrame(source: CodeSource): void {
        source.remove("test ");
        this.name.parseFrom(source);
    }
    parseBottomOfFrame(source: CodeSource): boolean {
       return this.parseStandardEnding(source, "end test");
    }
}