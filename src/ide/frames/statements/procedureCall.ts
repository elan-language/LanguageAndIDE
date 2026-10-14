import { callKeyword } from "../../../compiler/elan-keywords";
import { AbstractField, argListFieldSpec, procRefFieldSpec } from "../fields/abstract-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { SingleLineFrame } from "../single-line-frame";

export class ProcedureCall extends SingleLineFrame implements Statement {
  isStatement = true;
  isCall = true;
  proc: AbstractField;
  args: AbstractField;
  constructor(parent: Parent) {
    super(parent);
    this.proc = new AbstractField(this, procRefFieldSpec);
    this.proc.setPlaceholder("<i>procedureName</i>");
    this.args = new AbstractField(this, argListFieldSpec);
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
    return `${this.language().languageHtmlClass}_call`;
  }

  frameSpecificAnnotation(): string {
    return this.proc.text === "print" ? "" : "procedure call";
  }

  override renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}call ${this.proc.renderAsElanSource()}(${this.args.renderAsElanSource()})`;
  }
}
