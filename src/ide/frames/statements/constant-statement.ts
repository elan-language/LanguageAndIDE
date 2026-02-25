import { constantKeyword, setKeyword, toKeyword } from "../../../compiler/elan-keywords";
import { CodeSource } from "../frame-interfaces/code-source";
import { Parent } from "../frame-interfaces/parent";
import { AbstractDefinitionStatement } from "./abstract-definition.statement";

export class ConstantStatement extends AbstractDefinitionStatement {
  isStatement = true;
  constructor(parent: Parent) {
    super(parent);
  }

  isConstant = true;

  initialKeywords(): string {
    return constantKeyword;
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove(`${constantKeyword} `);
    this.name.parseFrom(source);
    source.remove(` ${setKeyword} ${toKeyword} `);
    this.expr.parseFrom(source);
    source.removeNewLine();
  }

  getIdPrefix(): string {
    return "let";
  }

  frameSpecificAnnotation(): string {
    return "constant";
  }

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${constantKeyword} ${this.name.renderAsElanSource()} ${setKeyword} ${toKeyword} ${this.expr.renderAsElanSource()}`;
  }
}
