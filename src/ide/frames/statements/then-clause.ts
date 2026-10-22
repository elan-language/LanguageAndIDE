import { ClauseOfIf } from "../clause-of-if";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Frame } from "../frame-interfaces/frame";

export class ThenClause extends ClauseOfIf {
  override isDeletable() {
    return false;
  }

  override isMovable(): boolean {
    return false;
  }

  override canInsertBefore(): boolean {
    return false;
  }

  override select(withFocus: boolean, _multiSelect: boolean): void {
    // The invisible 'then-clause' is never selected itself
    const parent = this.getParent() as unknown as Frame;
    if (parent.isSelected()) {
      this.getFirstChild().select(withFocus, false);
    } else {
      (this.getParent() as unknown as Frame).select(withFocus, false);
    }
  }

  override getFrNo(): string {
    return "";
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
