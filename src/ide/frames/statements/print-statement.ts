import { printKeyword } from "../../../compiler/elan-keywords";
import { ArgListField } from "../fields/arg-list-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { SingleLineFrame } from "../single-line-frame";

export class PrintStatement extends SingleLineFrame implements Statement {
  isStatement = true;
  isCall = true;
  args: ArgListField;
  constructor(parent: Parent) {
    super(parent);
    this.args = new ArgListField(this);
  }

  initialKeywords(): string {
    return printKeyword;
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove(`${printKeyword}`);
    source.remove("(");
    this.args.parseFrom(source);
    source.remove(")");
    source.removeNewLine();
  }
  getFields(): Field[] {
    return [this.args];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_print`;
  }

  frameSpecificAnnotation(): string {
    return "print";
  }

  override renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${printKeyword}(${this.args.renderAsElanSource()})`;
  }
}
