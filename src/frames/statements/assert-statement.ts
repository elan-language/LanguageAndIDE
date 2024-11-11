import { AssertOutcome } from "../../system";
import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import { AssertActualField } from "../fields/assert-actual-field";
import { ExpressionField } from "../fields/expression-field";
import { helper_compileMsgAsHtml } from "../helpers";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { assertKeyword } from "../keywords";
import { CompileStatus, DisplayStatus, TestStatus } from "../status-enums";
import { Transforms } from "../syntax-nodes/transforms";

export class AssertStatement extends AbstractFrame implements Statement {
  isStatement = true;
  actual: AssertActualField;
  expected: AssertActualField;
  outcome?: AssertOutcome;

  constructor(parent: Parent) {
    super(parent);
    this.actual = new AssertActualField(this);
    this.actual.setPlaceholder("computed value");
    this.expected = new ExpressionField(this, /\r|\n/);
    this.expected.setPlaceholder("expected value");
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
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><el-kw>assert </el-kw>${this.actual.renderAsHtml()}<el-kw> is </el-kw>${this.expected.renderAsHtml()}${this.compileOrTestMsgAsHtml()}${this.getFrNo()}</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}assert ${this.actual.renderAsSource()} is ${this.expected.renderAsSource()}`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    const expected = this.expected.compile(transforms);
    const actual = this.actual.compile(transforms);
    return `${this.indent()}_outcomes.push(system.assert(${actual}, ${expected}, "${this.htmlId}", _stdlib));`;
  }

  setOutcome(outcome: AssertOutcome) {
    this.outcome = outcome;
  }

  getTestStatus(): TestStatus {
    return this.outcome ? this.outcome.status : TestStatus.pending;
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
    if (!this.outcome) {
      cls = DisplayStatus[DisplayStatus.warning];
      msg = `not run`;
    } else if (this.outcome.status === TestStatus.fail) {
      cls = DisplayStatus[DisplayStatus.error];
      msg = `actual: ${this.outcome!.actual}`;
    } else if (this.outcome.status === TestStatus.pass) {
      cls = DisplayStatus[DisplayStatus.ok];
      msg = `pass`;
    }
    return ` <el-msg class="${cls}">${msg}</el-msg>`;
  }
}
