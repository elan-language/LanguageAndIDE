import { elseKeyword, endKeyword, ifKeyword } from "../../../compiler/elan-keywords";
import { ClauseOfIf } from "../clause-of-if";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";

export class ElseClause extends ClauseOfIf {
  initialKeywords(): string {
    return elseKeyword;
  }

  getFields(): Field[] {
    return [];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_else`;
  }

  frameSpecificAnnotation(): string {
    return "";
  }

  indent() {
    return this.getParent()!.indent(); //overrides the additional indent added for most child statements
  }

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${elseKeyword}\r
${this.renderChildrenAsElanSource()}`;
  }

  parseTop(source: CodeSource): void {
    source.remove("else");
  }

  parseBottom(source: CodeSource): boolean {
    source.removeIndent();
    let result = false;
    const endIf = `${endKeyword} ${ifKeyword}`;
    if (source.isMatch(endIf)) {
      result = true;
    }
    return result;
  }

  outerHtmlTag: string = "el-statement";
}
