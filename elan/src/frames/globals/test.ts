import { CodeSource } from "../code-source";
import { Identifier } from "../fields/identifier";
import { FrameWithStatements } from "../frame-with-statements";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Assert } from "../statements/assert";
import { Variable } from "../statements/variable";

export class Test extends FrameWithStatements {
    isTest = true;
    isGlobal = true;
    public name : Identifier;

    constructor(parent: Parent) {
        super(parent);
        this.multiline = true;
        this.statements.slice(0,1); //remove statement selector
        this.name = new Identifier(this);
        var result = new Variable(this);
        result.name.setTextWithoutParsing("result");
        this.statements.push(result);
        this.statements.push( new Assert(this));
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
        return `<test class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>test </keyword>${this.name.renderAsHtml()}</top>
${this.renderStatementsAsHtml()}
<keyword>end test</keyword>
</test>`;
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