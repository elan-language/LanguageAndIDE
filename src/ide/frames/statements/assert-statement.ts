import { AssertOutcome } from "../../../compiler/assert-outcome";
import { assertKeyword, evaluatesKeyword, toKeyword } from "../../../compiler/elan-keywords";
import { TestStatus } from "../../../compiler/test-status";
import { AssertActualField } from "../fields/assert-actual-field";
import { ExpressionField } from "../fields/expression-field";
import { escapeHtmlChars, helper_compileMsgAsHtmlNew } from "../frame-helpers";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { SingleLineFrame } from "../single-line-frame";
import { CompileStatus, DisplayColour } from "../status-enums";

export class AssertStatement extends SingleLineFrame implements Statement {
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
    source.remove(`${assertKeyword} `);
    this.actual.parseFrom(source);
    if (source.isMatch(" is ")) {
      source.remove(" is ");
    } else {
      source.remove(` ${evaluatesKeyword} ${toKeyword} `);
    }
    this.expected.parseFrom(source);
    source.removeNewLine();
  }
  getFields(): Field[] {
    return this.language().getFields(this);
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_assert`;
  }

  frameSpecificAnnotation(): string {
    return "assert";
  }

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${assertKeyword} ${this.actual.renderAsElanSource()} ${evaluatesKeyword} ${toKeyword} ${this.expected.renderAsElanSource()}`;
  }

  setOutcome(outcome: AssertOutcome) {
    this.outcome = outcome;
  }

  getTestStatus(): TestStatus {
    return this.outcome ? this.outcome.status : TestStatus.running;
  }

  compileOrTestMsgAsHtml(): string {
    let msg = "";
    if (
      this.readCompileStatus() === CompileStatus.ok ||
      this.readCompileStatus() === CompileStatus.advisory
    ) {
      msg = this.testMsgAsHtml();
    } else {
      msg = helper_compileMsgAsHtmlNew(this.getFile(), this);
    }
    return msg;
  }

  private getMessage(outcome: AssertOutcome | undefined) {
    if (!outcome || outcome.status === TestStatus.ignored) {
      return "not run";
    } else if (outcome.status === TestStatus.fail) {
      const offset = outcome.diffOffset;
      if (offset !== undefined) {
        let actual = outcome.actual;
        actual = offset > 0 ? `...${actual.substring(offset, offset + 50)}` : actual;
        actual = actual.length > 50 ? `${actual.substring(0, 50)}...` : actual;
        return `strings differ at [${offset}]. Actual: ${actual} `;
      }
      return `actual (computed): ${outcome.actual}`;
    } else if (outcome.status === TestStatus.pass) {
      return "pass";
    }
    return "";
  }

  private getCls(outcome: AssertOutcome | undefined) {
    if (!outcome || outcome.status === TestStatus.ignored) {
      return DisplayColour[DisplayColour.warning];
    } else if (outcome.status === TestStatus.fail) {
      return DisplayColour[DisplayColour.error];
    } else if (outcome.status === TestStatus.pass) {
      return DisplayColour[DisplayColour.ok];
    }
    return "";
  }

  override outerHtmlTag: string = "el-statement";

  testMsgAsHtml(): string {
    const cls = this.getCls(this.outcome);
    const msg = escapeHtmlChars(this.getMessage(this.outcome));
    return `<el-msg class="${cls}"> ${msg}</el-msg>`;
  }

  renderAsHtml(): string {
    // special case because of need to incorporate test message
    return `<${this.outerHtmlTag} class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}>${this.contextMenu()}<el-top>${this.language().renderSingleLineAsHtml(this)}</el-top>${this.helpAsHtml()}${this.compileOrTestMsgAsHtml()}${this.getFrNo()}</${this.outerHtmlTag}>`;
  }
}
