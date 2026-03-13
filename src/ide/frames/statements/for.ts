import { endKeyword, forKeyword, inKeyword } from "../../../compiler/elan-keywords";

import { ExpressionField } from "../fields/expression-field";
import { IdentifierField } from "../fields/identifier-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { FrameWithStatements } from "../frame-with-statements";

export class For extends FrameWithStatements implements Statement {
  isStatement = true;
  variable: IdentifierField;
  iter: ExpressionField;
  constructor(parent: File | Parent) {
    super(parent);
    this.variable = new IdentifierField(this);
    this.variable.setPlaceholder("<i>elementName</i>");
    this.iter = new ExpressionField(this);
    this.iter.setPlaceholder("<i>source</i>");
  }
  initialKeywords(): string {
    return forKeyword;
  }

  getFieldsDefaultImpl(): Field[] {
    return [this.variable, this.iter];
  }

  getIdPrefix(): string {
    return "for";
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
