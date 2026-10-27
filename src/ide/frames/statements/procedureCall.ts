import { callKeyword } from "../../../compiler/elan-keywords";
import { FieldImpl } from "../fields/field-impl";
import { procRefFieldSpec } from "../fields/field-spec";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { SingleLineFrame } from "../single-line-frame";

export class ProcedureCall extends SingleLineFrame implements Statement {
  isStatement = true;
  isCall = true;
  procRef: FieldImpl;

  constructor(parent: Parent) {
    super(parent);
    this.procRef = new FieldImpl(this, procRefFieldSpec);
    this.procRef.setPlaceholder("<i>procedureName</i>");
  }

  initialKeywords(): string {
    return callKeyword;
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove("call ");
    this.procRef.parseFrom(source);
    source.removeNewLine();
  }
  getFields(): Field[] {
    return [this.procRef];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_call`;
  }

  frameSpecificAnnotation(): string {
    return this.procRef.text.startsWith("print") ? "" : "procedure call";
  }

  override renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}call ${this.procRef.renderAsElanSource()}`;
  }
}
