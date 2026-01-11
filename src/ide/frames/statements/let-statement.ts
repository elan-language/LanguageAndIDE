import { beKeyword, letKeyword } from "../../../compiler/keywords";
import { CodeSource } from "../frame-interfaces/code-source";
import { Parent } from "../frame-interfaces/parent";
import { AbstractDefinitionStatement } from "./abstract-definition.statement";

export class LetStatement extends AbstractDefinitionStatement {
  isStatement = true;
  constructor(parent: Parent) {
    super(parent);
  }

  isLet = true;

  initialKeywords(): string {
    return letKeyword;
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove(`${letKeyword} `);
    this.name.parseFrom(source);
    source.remove(` ${beKeyword} `);
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
    return `${this.indent()}${this.sourceAnnotations()}${letKeyword} ${this.name.renderAsElanSource()} ${beKeyword} ${this.expr.renderAsElanSource()}`;
  }
}
