import { AssertOutcome } from "../../assert-outcome";
import { AbstractFrame } from "../abstract-frame";

import { AssertActualField } from "../fields/assert-actual-field";
import { ExpressionField } from "../fields/expression-field";
import { helper_compileMsgAsHtml } from "../frame-helpers";
import { TestFrame } from "../globals/test-frame";
import { CodeSource } from "../interfaces/code-source";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { Transforms } from "../interfaces/transforms";
import { assertKeyword } from "../keywords";
import { CompileStatus, DisplayColour, TestStatus } from "../status-enums";

export class AssertStatement extends AbstractFrame implements Statement {
  isStatement = true;
  actual: AssertActualField;
  expected: ExpressionField;
  outcome?: AssertOutcome;
  hrefForFrameHelp: string = "LangRef.html#assert";

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
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>${this.bpAsHtml()}<el-kw>assert </el-kw>${this.actual.renderAsHtml()}<el-kw> is </el-kw>${this.expected.renderAsHtml()}${this.compileOrTestMsgAsHtml()}${this.getFrNo()}</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}assert ${this.actual.renderAsSource()} is ${this.expected.renderAsSource()}`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    const test = this.getParent() as TestFrame;
    const ignored = test.ignored;
    const expected = this.expected.compile(transforms);
    const actual = this.actual.compile(transforms);
    const actualFunc = `async () => ${actual}`;
    return `${this.indent()}_outcomes.push(await system.assert(${ignored ? `""` : actualFunc}, ${ignored ? `""` : expected}, "${this.htmlId}", _stdlib, ${ignored}));`;
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
      msg = helper_compileMsgAsHtml(this);
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
      msg = `actual: ${this.outcome!.actual}`;
    } else if (this.outcome.status === TestStatus.pass) {
      cls = DisplayColour[DisplayColour.ok];
      msg = `pass`;
    }
    return ` <el-msg class="${cls}">${msg}</el-msg>`;
  }
}
