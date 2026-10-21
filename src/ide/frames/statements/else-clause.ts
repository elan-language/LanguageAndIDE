import { elseKeyword } from "../../../compiler/elan-keywords";
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
  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${elseKeyword}\r
${this.renderChildrenAsElanSource()}`;
  }

  parseTop(source: CodeSource): void {
    source.remove("else");
  }
}
