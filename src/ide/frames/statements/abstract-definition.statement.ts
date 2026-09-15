import { AbstractField, identifierField } from "../fields/abstract-field";
import { ExpressionField } from "../fields/expression-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { SingleLineFrame } from "../single-line-frame";

export abstract class AbstractDefinitionStatement extends SingleLineFrame implements Statement {
  isStatement = true;
  name: AbstractField;
  expr: ExpressionField;

  constructor(parent: Parent) {
    super(parent);
    this.name = new AbstractField(this, identifierField);
    this.expr = new ExpressionField(this);
  }
  abstract initialKeywords(): string;

  abstract parseFrom(source: CodeSource): void;

  abstract getIdPrefix(): string;

  abstract renderAsElanSource(): string;

  getFields(): Field[] {
    return [this.name, this.expr];
  }
}
