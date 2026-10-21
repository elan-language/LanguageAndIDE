import { elifKeyword, elseKeyword, endKeyword, ifKeyword } from "../../../compiler/elan-keywords";
import { ClauseOfIf } from "../clause-of-if";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";

export class ThenClause extends ClauseOfIf {
  override isDeletable() {
    return false;
  }
  override isMovable(): boolean {
    return false;
  }

  initialKeywords(): string {
    return elseKeyword;
  }

  getFields(): Field[] {
    return [];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_then`;
  }

  frameSpecificAnnotation(): string {
    return "";
  }

  indent() {
    return this.getParent()!.indent(); //overrides the additional indent added for most child statements
  }

  renderAsElanSource(): string {
    return this.renderChildrenAsElanSource();
  }

  parseTop(_source: CodeSource): void {
    throw new Error("Method not implemented.");
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
