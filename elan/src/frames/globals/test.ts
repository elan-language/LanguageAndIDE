import { CodeSource } from "../code-source";
import { IdentifierField } from "../fields/identifier-field";
import { FrameWithStatements } from "../frame-with-statements";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { Assert } from "../statements/assert";
import { VarStatement } from "../statements/var-statement";

export class Test extends FrameWithStatements {
    isTest = true;
    isGlobal = true;
    public name : IdentifierField;
    file: File;

    constructor(parent: File) {
        super(parent);
        this.file = parent;
        this.getChildren().splice(0,1); //remove statement selector
        this.name = new IdentifierField(this);
        var result = new VarStatement(this);
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
${this.renderChildrenAsHtml()}
<keyword>end test</keyword>
</test>`;
    }
    indent(): string {
        return "";
    }
    public renderAsSource() : string {
        return `test ${this.name.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
end test\r
`;
    }
    parseTop(source: CodeSource): void {
        source.remove("test ");
        this.name.parseFrom(source);
    }
    parseBottom(source: CodeSource): boolean {
       return this.parseStandardEnding(source, "end test");
    }
}