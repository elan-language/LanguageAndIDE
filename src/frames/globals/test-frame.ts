import { AssertOutcome } from "../../system";
import { CodeSource } from "../code-source";
import { IdentifierField } from "../fields/identifier-field";
import { FrameWithStatements } from "../frame-with-statements";
import { helper_CompileOrParseAsDisplayStatus, helper_testStatusAsDisplayStatus } from "../helpers";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { GlobalFrame } from "../interfaces/global-frame";
import { testKeyword } from "../keywords";
import { AssertStatement } from "../statements/assert-statement";
import { DisplayStatus, TestStatus } from "../status-enums";
import { Transforms } from "../syntax-nodes/transforms";

export class TestFrame extends FrameWithStatements implements GlobalFrame {
  isTest = true;
  isGlobal = true;
  public testName: IdentifierField;
  file: File;
  private _testStatus: TestStatus;

  constructor(parent: File) {
    super(parent);
    this.file = parent;
    this.testName = new IdentifierField(this);
    this.testName.setOptional(true);
    const selector = this.getChildren().pop()!;
    this.getChildren().push(selector);
    this._testStatus = TestStatus.default;
  }

  override readDisplayStatus(): DisplayStatus {
    let overall = DisplayStatus.error;
    const parseCompile = helper_CompileOrParseAsDisplayStatus(this);
    if (parseCompile !== DisplayStatus.ok) {
      overall = parseCompile;
    } else {
      overall = helper_testStatusAsDisplayStatus(this._testStatus);
    }
    return overall;
  }

  readTestStatus(): TestStatus {
    return this._testStatus;
  }

  updateTestStatus(): void {
    const tests = this.getChildren()
      .filter((c) => c instanceof AssertStatement)
      .map((c) => c as AssertStatement);
    const worstOf = (a: TestStatus, b: TestStatus) => (a < b ? a : b);
    const worst = tests.reduce((prev, t) => worstOf(t.getTestStatus(), prev), TestStatus.default);
    this._testStatus = worstOf(this._testStatus, worst);
  }

  resetTestStatus(): void {
    this._testStatus = TestStatus.default;
  }
  initialKeywords(): string {
    return testKeyword;
  }
  getFields(): Field[] {
    return [this.testName];
  }

  getIdPrefix(): string {
    return "test";
  }
  public renderAsHtml(): string {
    return `<test class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>test </keyword>${this.testName.renderAsHtml()}${this.compileOrTestMsgAsHtml()}${this.getFrNo()}</top>
${this.renderChildrenAsHtml()}
<keyword>end test</keyword>
</test>`;
  }
  indent(): string {
    return "";
  }
  public renderAsSource(): string {
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

  public compile(transforms: Transforms): string {
    this.compileErrors = [];

    return `_tests.push(["${this.htmlId}", async (_outcomes) => {\r
${this.compileChildren(transforms)}\r
}]);\r\n`;
  }

  getAsserts() {
    return this.getChildren().filter((c) => c instanceof AssertStatement) as AssertStatement[];
  }

  setAssertOutcomes(outcomes: AssertOutcome[]) {
    this.resetTestStatus();

    if (outcomes.some((o) => o.status === TestStatus.error)) {
      this._testStatus = TestStatus.error;

      for (const assert of this.getAsserts()) {
        assert.outcome = undefined;
      }
    } else {
      for (const assert of this.getAsserts()) {
        const match = outcomes.filter((o) => o.htmlId === assert.getHtmlId());
        if (match.length === 1) {
          assert.setOutcome(match[0]);
        }
      }
    }
  }

  compileOrTestMsgAsHtml() {
    if (this._testStatus === TestStatus.error) {
      return this.testMsgAsHtml();
    }
    return super.compileMsgAsHtml();
  }

  testMsgAsHtml(): string {
    return ` <msg class="${DisplayStatus[DisplayStatus.error]}">failed to run</msg>`;
  }
}
