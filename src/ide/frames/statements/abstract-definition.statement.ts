import { ExpressionField } from "../fields/expression-field";
import { ValueDefField } from "../fields/value-def-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { SingleLineStatement } from "../single-line-statement";

export abstract class AbstractDefinitionStatement extends SingleLineStatement implements Statement {
  isStatement = true;
  name: ValueDefField;
  expr: ExpressionField;

  constructor(parent: Parent) {
    super(parent);
    this.name = new ValueDefField(this);
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
