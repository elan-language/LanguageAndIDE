import { endKeyword, forKeyword, inKeyword } from "../../../compiler/elan-keywords";
import { FieldImpl } from "../fields/field-impl";
import { identifierFieldSpec, expressionFieldSpec } from "../fields/field-spec";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { FrameWithStatements } from "../frame-with-statements";

export class ForLoop extends FrameWithStatements implements Statement {
  isStatement = true;
  variable: FieldImpl;
  iter: FieldImpl;
  constructor(parent: File | Parent) {
    super(parent);
    this.variable = new FieldImpl(this, identifierFieldSpec);
    this.variable.setPlaceholder("<i>item</i>");
    this.iter = new FieldImpl(this, expressionFieldSpec);
    this.iter.setPlaceholder("<i>source</i>");
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
