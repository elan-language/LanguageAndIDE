import {
  elifKeyword,
  elseKeyword,
  endKeyword,
  ifKeyword,
  thenKeyword,
} from "../../../compiler/elan-keywords";
import { ClauseOfIf } from "../clause-of-if";
import { CodeSourceFromString } from "../code-source-from-string";
import { FieldImpl } from "../fields/field-impl";
import { expressionFieldSpec } from "../fields/field-spec";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";

export class ElseIfClause extends ClauseOfIf {
  condition: FieldImpl;

  constructor(parent: Parent) {
    super(parent);
    this.condition = new FieldImpl(this, expressionFieldSpec);
    this.condition.setPlaceholder("<i>condition</i>");
  }

  initialKeywords(): string {
    return elifKeyword;
  }

  getFields(): Field[] {
    return [this.condition];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_elseIf`;
  }

  frameSpecificAnnotation(): string {
    return "";
  }

  indent() {
    return this.getParent()!.indent(); //overrides the additional indent added for most child statements
  }

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${elifKeyword} ${this.condition.renderAsElanSource()} ${thenKeyword}\r
${this.renderChildrenAsElanSource()}`;
  }

  parseTop(source: CodeSource): void {
    source.remove(`${elifKeyword} `);
    const condition = source.readUntil(/\sthen/);
    this.condition.parseFrom(new CodeSourceFromString(condition));
    source.remove(` ${thenKeyword}`);
  }

  parseBottom(source: CodeSource): boolean {
    source.removeIndent();
    let result = false;
    const endIf = `${endKeyword} ${ifKeyword}`;
    const elseIfClause = elifKeyword;
    const elseClause = elseKeyword;
    if (source.isMatch(endIf) || source.isMatch(elseIfClause) || source.isMatch(elseClause)) {
      result = true;
    }
    return result;
  }

  outerHtmlTag: string = "el-statement";
}
