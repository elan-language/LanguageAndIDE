import { AssertOutcome } from "../../system";
import { CodeSource } from "../code-source";
import { IdentifierField } from "../fields/identifier-field";
import { FrameWithStatements } from "../frame-with-statements";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { GlobalFrame } from "../interfaces/global-frame";
import { testKeyword } from "../keywords";
import { AssertStatement } from "../statements/assert-statement";
import { Transforms } from "../syntax-nodes/transforms";
import { TestStatus } from "../test-status";

export class TestFrame extends FrameWithStatements implements GlobalFrame {
    isTest = true;
    isGlobal = true;
    public testName : IdentifierField;
    file: File;

    constructor(parent: File) {
        super(parent);
        this.file = parent;
        this.testName = new IdentifierField(this);
        var selector = this.getChildren().pop()!;
        this.getChildren().push(selector);
    }

    getTestStatus(): TestStatus {
        var tests =  this.getChildren().filter(c => c instanceof TestFrame).map(c => c as TestFrame);
        var worst = tests.reduce((prev,t) => this.worstOf(t.getTestStatus(), prev), TestStatus.pending);
        return worst;
    }
    
    private worstOf(a: TestStatus, b: TestStatus) {
        return a < b ? a : b;
    }

    initialKeywords(): string {
        return testKeyword;
    }
    getFields(): Field[] {
        return [this.testName];
    }

    getIdPrefix(): string {
        return 'test';
    }
    public renderAsHtml() : string {
        return `<test class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>test </keyword>${this.testName.renderAsHtml()}</top>${this.compileMsgAsHtml()}
${this.renderChildrenAsHtml()}
<keyword>end test</keyword>
</test>`;
    }
    indent(): string {
        return "";
    }
    public renderAsSource() : string {
        return `test ${this.testName.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
end test\r
`;
    }
    parseTop(source: CodeSource): void {
        source.remove("test ");
        this.testName.parseFrom(source);
    }
    parseBottom(source: CodeSource): boolean {
       return this.parseStandardEnding(source, "end test");
    }

    public compile(transforms : Transforms): string {
        this.compileErrors = [];

        return `_tests.push(["${this.htmlId}", (_outcomes) => {\r
${this.compileChildren(transforms)}\r
}]);\r\n`;          
    }

    setAssertOutcomes(outcomes: AssertOutcome[]) {
        for (const assert of this.getChildren().filter(c => c instanceof AssertStatement) as AssertStatement[]) {
            const match = outcomes.filter(o => o.htmlId === assert.getHtmlId());
            if (match.length === 1) {
                assert.setOutcome(match[0]);
            }
        }
    }
}