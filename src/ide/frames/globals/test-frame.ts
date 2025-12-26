import { AssertOutcome } from "../../../compiler/assert-outcome";
import { BreakpointStatus } from "../../../compiler/debugging/breakpoint-status";
import { ignoreKeyword, testKeyword } from "../../../compiler/keywords";
import { TestStatus } from "../../../compiler/test-status";
import { CommentField } from "../fields/comment-field";
import {
  helper_CompileOrParseAsDisplayStatus,
  helper_testStatusAsDisplayStatus,
  pyNote,
} from "../frame-helpers";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { GlobalFrame } from "../frame-interfaces/global-frame";
import { FrameWithStatements } from "../frame-with-statements";
import { AssertStatement } from "../statements/assert-statement";
import { DisplayColour } from "../status-enums";

export class TestFrame extends FrameWithStatements implements GlobalFrame {
  isTest = true;
  isGlobal = true;
  public testDescription: CommentField;
  file: File;
  private _testStatus: TestStatus;
  protected canHaveBreakPoint = false;
  constructor(parent: File) {
    super(parent);
    this.file = parent;
    this.testDescription = new CommentField(this);
    this.testDescription.setPlaceholder("<i>optional description</i>");
    const selector = this.getChildren().pop()!;
    this.getChildren().push(selector);
    this._testStatus = TestStatus.default;
  }

  override readDisplayStatus(): DisplayColour {
    let overall = DisplayColour.error;
    const parseCompile = helper_CompileOrParseAsDisplayStatus(this);
    if (parseCompile !== DisplayColour.ok) {
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
      .filter((c) => c instanceof AssertStatement && !c.isGhosted())
      .map((c) => c as AssertStatement);
    const worstOf = (a: TestStatus, b: TestStatus) => (a < b ? a : b);
    const worst = tests.reduce((prev, t) => worstOf(t.getTestStatus(), prev), TestStatus.default);
    this._testStatus = worstOf(this._testStatus, worst);
  }

  resetTestStatus(): void {
    this._testStatus = TestStatus.default;
    for (const assert of this.getAsserts()) {
      assert.outcome = undefined;
    }
  }
  initialKeywords(): string {
    return testKeyword;
  }
  getFields(): Field[] {
    return [this.testDescription];
  }

  getIdPrefix(): string {
    return "test";
  }
  public renderAsHtml(): string {
    return `<el-test class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}>
<el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand>
<el-kw>def </el-kw> <el-method>test_${this.testDescription.renderAsSource()}</el-method>(): <el-kw>none</el-kw>
${this.helpAsHtml()}${this.compileOrTestMsgAsHtml()}${pyNote(testKeyword)}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}
</el-test>`;
  }
  indent(): string {
    return "";
  }
  public renderAsSource(): string {
    return `${this.sourceAnnotations()}test ${this.testDescription.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
end test\r
`;
  }
  parseTop(source: CodeSource): void {
    if (source.isMatch(`${ignoreKeyword} `)) {
      source.remove(`${ignoreKeyword} `);
      this.setGhosted(true);
    }
    source.remove("test ");
    this.testDescription.parseFrom(source);
  }
  parseBottom(source: CodeSource): boolean {
    return this.parseStandardEnding(source, "end test");
  }

  setAssertOutcomes(outcomes: AssertOutcome[]) {
    this.resetTestStatus();
    const asserts = this.getAsserts();

    if (outcomes.some((o) => o.status === TestStatus.error)) {
      this._testStatus = TestStatus.error;

      for (const assert of asserts) {
        assert.outcome = undefined;
      }
    } else {
      for (const assert of asserts) {
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
    return ` <el-msg class="${DisplayColour[DisplayColour.error]}">failed to run</el-msg>`;
  }

  clearBreakPoint = () => {
    this.breakpointStatus = BreakpointStatus.none;
    return false;
  };
}
