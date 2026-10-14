import { FieldImpl, expressionFieldSpec, identifierFieldSpec } from "../fields/field-impl";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { SingleLineFrame } from "../single-line-frame";

export abstract class AbstractDefinitionStatement extends SingleLineFrame implements Statement {
  isStatement = true;
  name: FieldImpl;
  expr: FieldImpl;

  constructor(parent: Parent) {
    super(parent);
    this.name = new FieldImpl(this, identifierFieldSpec);
    this.expr = new FieldImpl(this, expressionFieldSpec);
  }
  abstract initialKeywords(): string;

  abstract parseFrom(source: CodeSource): void;

  abstract getIdPrefix(): string;

  abstract renderAsElanSource(): string;

  getFields(): Field[] {
    return [this.name, this.expr];
  }
}
