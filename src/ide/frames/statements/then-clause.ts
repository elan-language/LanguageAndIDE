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
    return "";
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

  renderAsElanSource(): string {
    return this.renderChildrenAsElanSource();
  }

  parseTop(_source: CodeSource): void {
    // does nothing
  }
}
