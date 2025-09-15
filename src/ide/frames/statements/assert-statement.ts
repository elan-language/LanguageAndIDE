import { AssertOutcome } from "../../../compiler/assert-outcome";
import { assertKeyword } from "../../../compiler/keywords";
import { TestStatus } from "../../../compiler/test-status";
import { AbstractFrame } from "../abstract-frame";
import { AssertActualField } from "../fields/assert-actual-field";
import { ExpressionField } from "../fields/expression-field";
import { helper_compileMsgAsHtmlNew } from "../frame-helpers";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { CompileStatus, DisplayColour } from "../status-enums";

export class AssertStatement extends AbstractFrame implements Statement {
  isStatement = true;
  actual: AssertActualField;
  expected: ExpressionField;
  outcome?: AssertOutcome;
  constructor(parent: Parent) {
    super(parent);
    this.actual = new AssertActualField(this);
    this.expected = new ExpressionField(this, /\r|\n/);
    this.expected.setPlaceholder("<i>expected value</i>");
  }

  initialKeywords(): string {
    return assertKeyword;
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove("assert ");
    this.actual.parseFrom(source);
    source.remove(" is ");
    this.expected.parseFrom(source);
    source.removeNewLine();
  }
  getFields(): Field[] {
    return [this.actual, this.expected];
  }

  getIdPrefix(): string {
    return "assert";
  }

  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}>${this.contextMenu()}<el-kw>assert </el-kw>${this.actual.renderAsHtml()}<el-kw> is </el-kw>${this.expected.renderAsHtml()}${this.helpAsHtml()}${this.compileOrTestMsgAsHtml()}${this.getFrNo()}</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}assert ${this.actual.renderAsSource()} is ${this.expected.renderAsSource()}`;
  }

  setOutcome(outcome: AssertOutcome) {
    this.outcome = outcome;
  }

  getTestStatus(): TestStatus {
    return this.outcome ? this.outcome.status : TestStatus.running;
  }

  compileOrTestMsgAsHtml(): string {
    let msg = "";
    if (this.readCompileStatus() === CompileStatus.ok) {
      msg = this.testMsgAsHtml();
    } else {
      msg = helper_compileMsgAsHtmlNew(this.getFile(), this);
    }
    return msg;
  }

  testMsgAsHtml(): string {
    let cls = "";
    let msg = "";
    if (!this.outcome || this.outcome.status === TestStatus.ignored) {
      cls = DisplayColour[DisplayColour.warning];
      msg = `not run`;
    } else if (this.outcome.status === TestStatus.fail) {
      cls = DisplayColour[DisplayColour.error];
      msg = `actual (computed): ${this.outcome!.actual}`;
    } else if (this.outcome.status === TestStatus.pass) {
      cls = DisplayColour[DisplayColour.ok];
      msg = `pass`;
    }
    return ` <el-msg class="${cls}">${msg}</el-msg>`;
  }
}
