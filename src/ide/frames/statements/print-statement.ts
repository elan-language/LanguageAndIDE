import { printKeyword } from "../../../compiler/elan-keywords";
import { ExpressionField } from "../fields/expression-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { SingleLineFrame } from "../single-line-frame";

export class PrintStatement extends SingleLineFrame implements Statement {
  isStatement = true;
  isCall = true;
  arg: ExpressionField;
  constructor(parent: Parent) {
    super(parent);
    this.arg = new ExpressionField(this);
    this.arg.readUntil = /\)\r?\n/;
  }

  initialKeywords(): string {
    return printKeyword;
  }

  override helpId(): string {
    return "print_statement";
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove(`${printKeyword}`);
    source.remove("(");
    this.arg.parseFrom(source);
    source.remove(")");
    source.removeNewLine();
  }
  getFields(): Field[] {
    return [this.arg];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_print`;
  }

  frameSpecificAnnotation(): string {
    return "print statement";
  }

  override renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${printKeyword}(${this.arg.renderAsElanSource()})`;
  }
}
