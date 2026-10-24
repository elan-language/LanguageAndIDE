import { endKeyword, forKeyword, inKeyword } from "../../../compiler/elan-keywords";
import { AbstractSelector } from "../abstract-selector";
import { CompoundFrame } from "../compound-statement";
import { FieldImpl } from "../fields/field-impl";
import { expressionFieldSpec, identifierFieldSpec } from "../fields/field-spec";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { StatementSelector } from "./statement-selector";

export class ForLoop extends CompoundFrame implements Statement {
  isStatement = true;
  variable: FieldImpl;
  iter: FieldImpl;
  constructor(parent: Parent) {
    super(parent);
    this.variable = new FieldImpl(this, identifierFieldSpec);
    this.variable.setPlaceholder("<i>item</i>");
    this.iter = new FieldImpl(this, expressionFieldSpec);
    this.iter.setPlaceholder("<i>source</i>");
  }

  newChildSelector(): AbstractSelector {
    return new StatementSelector(this);
  }

  initialKeywords(): string {
    return forKeyword;
  }

  getFields(): Field[] {
    return [this.variable, this.iter];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_for`;
  }

  frameSpecificAnnotation(): string {
    return "for";
  }

  outerHtmlTag: string = "el-statement";

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${forKeyword} ${this.variable.renderAsElanSource()} in ${this.iter.renderAsElanSource()}\r
${this.renderChildrenAsElanSource()}\r
${this.indent()}${endKeyword} ${forKeyword}`;
  }

  parseTop(source: CodeSource): void {
    source.remove(`${forKeyword} `);
    this.variable.parseFrom(source);
    source.remove(` ${inKeyword} `);
    this.iter.parseFrom(source);
  }
  parseBottom(source: CodeSource): boolean {
    return this.parseStandardEnding(source, `${endKeyword} ${forKeyword}`);
  }
}
