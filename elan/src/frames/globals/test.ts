import { CodeSource } from "../code-source";
import { Identifier } from "../fields/identifier";
import { FrameWithStatements } from "../frame-with-statements";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { Assert } from "../statements/assert";
import { VariableDefStatement } from "../statements/variable-def-statement";

export class Test extends FrameWithStatements {
    isTest = true;
    isGlobal = true;
    public name : Identifier;
    file: File;

    constructor(parent: File) {
        super(parent);
        this.file = parent;
        this.multiline = true;
        this.getChildren().splice(0,1); //remove statement selector
        this.name = new Identifier(this);
        var result = new VariableDefStatement(this);
        result.name.setText("result");
        this.getChildren().push(result);
        this.getChildren().push( new Assert(this));
    }

    getFields(): Field[] {
        return [this.name];
    }

    getIdPrefix(): string {
        return 'test';
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
    insertSelector(after: boolean): void {
        this.file.insertSelector(after, this);
    }
}