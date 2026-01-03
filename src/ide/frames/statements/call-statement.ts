import { callKeyword } from "../../../compiler/keywords";
import { AbstractFrame } from "../abstract-frame";
import { ArgListField } from "../fields/arg-list-field";
import { ProcRefField } from "../fields/proc-ref-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";

export class CallStatement extends AbstractFrame implements Statement {
  isStatement = true;
  isCall = true;
  proc: ProcRefField;
  args: ArgListField;
  constructor(parent: Parent) {
    super(parent);
    this.proc = new ProcRefField(this);
    this.proc.setPlaceholder("<i>procedureName</i>");
    this.args = new ArgListField(this);
  }

  initialKeywords(): string {
    return callKeyword;
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove("call ");
    this.proc.parseFrom(source);
    source.remove("(");
    this.args.parseFrom(source);
    source.remove(")");
    source.removeNewLine();
  }
  getFields(): Field[] {
    return [this.proc, this.args];
  }

  getIdPrefix(): string {
    return "call";
  }

  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}>${this.contextMenu()}${this.bpAsHtml()}<el-top>
    ${this.displayLanguage().renderSingleLineAsHtml(this)}
    ${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.annotationAsHtml()}${this.getFrNo()}</el-top></el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}call ${this.proc.renderAsSource()}(${this.args.renderAsSource()})`;
  }
}
