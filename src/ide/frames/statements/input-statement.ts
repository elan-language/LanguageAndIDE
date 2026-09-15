import { inputKeyword, setKeyword, toKeyword } from "../../../compiler/elan-keywords";
import { AbstractField, identifierField } from "../fields/abstract-field";
import { ArgListField } from "../fields/arg-list-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { SingleLineFrame } from "../single-line-frame";

export class InputStatement extends SingleLineFrame implements Statement {
  isStatement = true;
  isCall = true;
  name: AbstractField;
  prompt: ArgListField;
  constructor(parent: Parent) {
    super(parent);
    this.name = new AbstractField(this, identifierField);
    this.prompt = new ArgListField(this);
    this.prompt.setOptional(false);
    this.prompt.setPlaceholder("prompt message");
  }

  initialKeywords(): string {
    return inputKeyword;
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove(`${inputKeyword} `);
    this.name.parseFrom(source);
    source.remove(` ${setKeyword} ${toKeyword} `);
    //TODO optional prefixCode
    source.remove(`inputString(`);
    this.prompt.parseFrom(source);
    source.remove(")");
    //TODO optional afterCode
    source.removeNewLine();
  }
  getFields(): Field[] {
    return [this.name, this.prompt];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_print`;
  }

  frameSpecificAnnotation(): string {
    return "input statement";
  }

  override renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${inputKeyword} ${this.name.renderAsElanSource()} ${setKeyword} ${toKeyword} inputString(${this.prompt.renderAsElanSource()})`;
  }
}
