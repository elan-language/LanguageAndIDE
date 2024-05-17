import { Test } from "mocha";
import { AssertOutcome } from "../../system";
import { CodeSource } from "../code-source";
import { IdentifierField } from "../fields/identifier-field";
import { FrameWithStatements } from "../frame-with-statements";
import {
  helper_testStatusAsDisplayStatus,
  helper_CompileOrParseAsDisplayStatus,
} from "../helpers";
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
    const worst = tests.reduce(
      (prev, t) => worstOf(t.getTestStatus(), prev),
      TestStatus.default,
    );
    this._testStatus = worst;
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
<top><expand>+</expand><keyword>test </keyword>${this.testName.renderAsHtml()}</top>${this.compileMsgAsHtml()}
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

    return `_tests.push(["${this.htmlId}", (_outcomes) => {\r
${this.compileChildren(transforms)}\r
}]);\r\n`;
  }

  setAssertOutcomes(outcomes: AssertOutcome[]) {
    for (const assert of this.getChildren().filter(
      (c) => c instanceof AssertStatement,
    ) as AssertStatement[]) {
      const match = outcomes.filter((o) => o.htmlId === assert.getHtmlId());
      if (match.length === 1) {
        assert.setOutcome(match[0]);
      }
    }
  }
}
